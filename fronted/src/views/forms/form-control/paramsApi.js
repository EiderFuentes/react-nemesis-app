export const paramsApi = (data) => {
    let params = JSON.parse(JSON.stringify(data));

    //---------- Inicio pregunta 31 -------------
    params.desplazamiento = [params.desplazamiento];
    //---------- Fin pregunta 31 ----------------

    //---------- Inicio pregunta 34 -------------
    let { tiempoCasa, especifiqueOtro_34 } = params;
    const { otro_34 } = tiempoCasa;
    delete tiempoCasa.otro_34;
    delete params.especifiqueOtro_34;
    tiempoCasa = { ...tiempoCasa, especifique: otro_34, especifiqueOtro: especifiqueOtro_34 };
    params.tiempoCasa = [tiempoCasa];
    //---------- Fin pregunta 34 -------------

    //---------- Inicio pregunta 43 -------------
    const { fumaCigarrillo, consumeLicor } = params;
    delete params.fumaCigarrillo;
    delete params.consumeLicor;
    params = { ...params, conviven: [{ fumaCigarrillo, consumeLicor }] };
    //---------- Fin pregunta 43 ----------------

    //---------- Inicio pregunta 45 -------------
    let { tiempoLibre, especifiqueOtro_45 } = params;
    const { otro_45 } = tiempoLibre;
    delete params.especifiqueOtro_45;
    delete tiempoLibre.otro_45;
    tiempoLibre = { ...tiempoLibre, otro: otro_45, especifiqueOtro: especifiqueOtro_45 };
    params.tiempoLibre = [tiempoLibre];
    //---------- Fin pregunta 45 -------------

    //---------- Inicio pregunta 52 -------------
    params.accesoVivienda = [params.accesoVivienda];
    //---------- Fin pregunta 52 -------------

    //---------- Inicio pregunta 53 -------------
    let { tiempoDesplazamiento: { otro_53 }, especifiqueOtro_53 } = params;
    delete params.especifiqueOtro_53;
    delete params.tiempoDesplazamiento.otro_53;
    params.tiempoDesplazamiento = [{
        ...params.tiempoDesplazamiento,
        otro: otro_53,
        especifiqueOtro: especifiqueOtro_53
    }];
    //---------- Fin pregunta 53 -------------

    //---------- Inicio pregunta 55 -------------
    params.combustibleCocina = [params.combustibleCocina];
    //---------- Fin pregunta 55 -------------

    //---------- Inicio pregunta 57 -------------
    const { serviciosBasicos: { telefono_57 } } = params;
    delete params.serviciosBasicos.telefono_57;
    params.serviciosBasicos = [{ ...params.serviciosBasicos, telefono: telefono_57 }];
    //---------- Fin pregunta 57 -------------

    //---------- Inicio pregunta 67 -------------
    params.topografiaTerreno = [params.topografiaTerreno];
    //---------- Fin pregunta 67 -------------

    //---------- Inicio pregunta 68 -------------
    const { especifiqueOtro_68 } = params;
    delete params.especifiqueOtro_68;
    params.lugaresVivienda = [{ ...params.lugaresVivienda, especifiqueOtro: especifiqueOtro_68 }];
    //---------- Fin pregunta 68 -------------

    //---------- Inicio pregunta 73 -------------
    const { cocina_73: cocina, dormitorioAdulto_73: dormitorioAdulto, sala_73: sala,
        dormitorioNinos_73: dormitorioNinos, sanitario_73: sanitario, lavadero_73: lavadero } = params;

    const ambientesSeparados = {
        cocina, dormitorioAdulto, sala,
        dormitorioNinos, sanitario, lavadero
    };
    delete params.cocina_73;
    delete params.dormitorioAdulto_73;
    delete params.sala_73;
    delete params.dormitorioNinos_73;
    delete params.sanitario_73;
    delete params.lavadero_73;
    params = { ...params, ambientesSeparados: [ambientesSeparados] };
    //---------- Fin pregunta 73 -------------

    //---------- Inicio pregunta 75 -------------
    const { duermenVivienda: { otro_75 }, cualOtro_75 } = params;
    delete params.duermenVivienda.otro_75;
    delete params.cualOtro_75;
    params.duermenVivienda = [{ ...params.duermenVivienda, otro: otro_75, cualOtro: cualOtro_75 }];
    //---------- Fin pregunta 75 -------------

    //---------- Inicio pregunta 77 -------------
    const { lavamanos_77: lavamanos, lavaplatos_77: lavaplatos, lavaRopa_77: lavaRopa } = params;
    const elementosCasa = [{ lavamanos, lavaplatos, lavaRopa }];
    delete params.lavamanos_77;
    delete params.lavaplatos_77;
    delete params.lavaRopa_77;
    params = { ...params, elementosCasa };
    //---------- Fin pregunta 77 -------------

    return params;
};
