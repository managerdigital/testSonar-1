import { ApplicationException } from '../common/exceptions/application.exception';

import { VentasProductosLocatarios } from './repositories/domain/ventasProductoLocatarios.domain';

import { VentasProductosLocatariosPGRepository } from './repositories/implementation/pg/ventasProductosLocatarios.imp';

export class VentasProductosLocatariosService{
    
    
    constructor(private readonly ventasProductosLocatariosRepository: VentasProductosLocatariosPGRepository){}

    async getAll(): Promise<VentasProductosLocatarios[]> {
        const productos = await this.ventasProductosLocatariosRepository.getAll();
        if(!productos) throw new ApplicationException("No hay productos");
        return productos;
    }

    async getCantidadProductosVendidos(): Promise<{cantidad: number}> {
        const productos = await this.ventasProductosLocatariosRepository.getCantidadProductosVendidos();
        if(!productos) throw new ApplicationException("No hay productos");
        return productos;
    }

    async getMasVendidos(): Promise<[{producto_locatario_id: number, count: string}]> {
        const productos = await this.ventasProductosLocatariosRepository.getMasVendidos();
        if(!productos) throw new ApplicationException("No hay productos");
        return productos;
    }


    
}