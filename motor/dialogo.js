/* =========================================================================
   DIÁLOGOS
   Estructura en los datos:
   dialogos: {
     id: {
       alTerminar: ["efecto", ...],            // opcional
       nodos: {
         inicio: { habla: "ines", texto: "...", efectos: [...],
                   opciones: [ { texto: "...", ir: "otroNodo", si: [...], efectos: [...] } ],
                   ir: "siguienteNodo" }        // si no hay opciones
       }
     }
   }
   "FIN" como destino termina la conversación.
   ========================================================================= */
(function () {
  "use strict";
  const el = BIO.el;

  BIO.dialogo = {};

  BIO.dialogo.abrir = function (id) {
    const d = BIO.datosCap().dialogos[id];
    if (!d) { console.error("Diálogo no encontrado:", id); return Promise.resolve(); }
    const dlg = BIO.$("#conversacion");
    const cap = BIO.cap();
    const diferidos = [];
    let opcionesActuales = [];

    return new Promise(function (resolve) {
      async function efectosInmediatos(lista) {
        if (!lista) return;
        for (const ef of lista) {
          if (BIO.EFECTOS_DIFERIBLES.indexOf(BIO.partirEfecto(ef).tipo) >= 0) diferidos.push(ef);
          else await BIO.ejecutar([ef]);
        }
      }

      async function mostrar(nid) {
        if (!nid || nid === "FIN") { await cerrar(); return; }
        const n = d.nodos[nid];
        if (!n) { console.error("Nodo de diálogo no encontrado:", id, nid); await cerrar(); return; }
        await efectosInmediatos(n.efectos);

        const h = BIO.ui.hablante(n.habla);
        dlg.innerHTML = "";
        const retrato = el("div", { class: "conv-retrato" + (h.narrador ? " vacio" : "") });
        if (h.retrato) retrato.innerHTML = BIO.arte.retrato(h.retrato);
        else if (h.jugador) retrato.innerHTML = BIO.arte.retratoJugador();
        const cuerpo = el("div", { class: "conv-cuerpo" });
        if (!h.narrador) cuerpo.appendChild(el("p", { class: "conv-nombre", id: "conv-nombre" }, [h.nombre, h.rol ? el("span", { class: "rol" }, " · " + h.rol) : null]));
        else cuerpo.appendChild(el("p", { class: "conv-nombre sr", id: "conv-nombre" }, "Narración"));
        const texto = BIO.fmt(n.texto, "conv-texto" + (h.narrador ? " narrador" : ""));
        texto.id = "conv-texto";
        cuerpo.appendChild(texto);

        let ops = (n.opciones || []).filter(function (o) { return BIO.cumple(o.si); });
        if (!ops.length) {
          const sigue = n.ir && n.ir !== "FIN";
          ops = [{ texto: sigue ? "Continuar" : "Terminar conversación", ir: n.ir || "FIN" }];
        }
        opcionesActuales = ops;
        const lista = el("ol", { class: "conv-opciones" });
        ops.forEach(function (o, i) {
          const clave = id + "." + nid + "." + i;
          const vista = !!cap.vistas[clave];
          lista.appendChild(el("li", {}, el("button", {
            class: "conv-op" + (vista && ops.length > 1 ? " vista" : ""),
            type: "button",
            onclick: async function () {
              if (dlg.dataset.ocupado) return;
              dlg.dataset.ocupado = "1";
              cap.vistas[clave] = true;
              await efectosInmediatos(o.efectos);
              delete dlg.dataset.ocupado;
              await mostrar(o.ir || "FIN");
            }
          }, [el("span", { class: "num", "aria-hidden": "true" }, String(i + 1)), el("span", {}, BIO.plano(o.texto))])));
        });
        cuerpo.appendChild(lista);
        dlg.appendChild(el("div", { class: "conv" }, [retrato, cuerpo]));
        dlg.setAttribute("aria-describedby", "conv-texto");
        if (!dlg.open) dlg.showModal();
        const primero = lista.querySelector("button");
        if (primero) primero.focus({ preventScroll: true });
        BIO.anunciar((h.nombre ? h.nombre + ": " : "") + n.texto);
      }

      function alTeclear(e) {
        if (e.key >= "1" && e.key <= "9") {
          const b = dlg.querySelectorAll(".conv-op")[Number(e.key) - 1];
          if (b) { e.preventDefault(); b.click(); }
        }
      }
      function alCancelar(e) {
        e.preventDefault();
        // Esc solo cierra si la conversación ya ofrece terminar
        const idx = opcionesActuales.findIndex(function (o) { return !o.ir || o.ir === "FIN"; });
        if (idx >= 0) dlg.querySelectorAll(".conv-op")[idx].click();
      }
      dlg.addEventListener("keydown", alTeclear);
      dlg.addEventListener("cancel", alCancelar);

      async function cerrar() {
        dlg.removeEventListener("keydown", alTeclear);
        dlg.removeEventListener("cancel", alCancelar);
        if (dlg.open) dlg.close();
        dlg.innerHTML = "";
        BIO.guardado.guardar();
        BIO.escena.refrescar();
        BIO.ui.focoSeguro();
        await BIO.ejecutar(diferidos.concat(d.alTerminar || []));
        resolve();
      }

      mostrar("inicio");
    });
  };
})();
