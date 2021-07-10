import { ApplicationException } from '../common/exceptions/application.exception';

import { VentasProductosLocatariosPGRepository } from './repositories/implementation/pg/ventasProductosLocatarios.imp';

import { VentasProductosLocatarios } from './repositories/domain/ventasProductoLocatarios.domain';


export class VentasProductosLocatariosService{
    
    
    constructor(private readonly ventasProductosLocatariosRepository: VentasProductosLocatariosPGRepository){}

    async getAll(): Promise<VentasProductosLocatarios[]> {
        const productos = await this.ventasProductosLocatariosRepository.getAll();
        if(!productos) throw new ApplicationException("No hay productos");
        return productos;
    }
    
}