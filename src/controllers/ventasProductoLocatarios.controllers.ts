import { Request, Response } from 'express';
import { route, GET } from 'awilix-express';

import { BaseController } from '../common/controllers/base.controller';

import { VentasProductosLocatariosService } from '../services/ventasProductosLocatarios.service';
import { ProductosLocatariosService } from '../services/productosLocatarios.service';
// import { VentasProductosLocatarios } from '../services/repositories/domain/ventasProductoLocatarios.domain';
import { ProductoService } from '../services/productos.service';

@route('/ventaProductoLocatarios')
export class VentaProductosLocatariosController extends BaseController{
   
    constructor(private readonly ventasProductosLocatariosService: VentasProductosLocatariosService,
                private readonly productosLocatariosService: ProductosLocatariosService,
                private readonly productoService: ProductoService){
        super();
    }
   
    @route('/getAll')
    @GET()
    public async getAll(req: Request, res: Response): Promise<void>{

        try {
            const ventas = await this.ventasProductosLocatariosService.getAll();

            res.status(200).json({
                ok: true,
                ventas
            });

        } catch(error) {
            this.handleException(error, res);
        }
    }
   
    @route('/getCantidadProductosVendidos')
    @GET()
    public async getCantidadProductosVendidos(req: Request, res: Response): Promise<void>{

        try {
            const ventas = await this.ventasProductosLocatariosService.getCantidadProductosVendidos();

            res.status(200).json({
                ok: true,
                cantidad: ventas.cantidad
            });

        } catch(error) {
            this.handleException(error, res);
        }
    }
   
    @route('/getMasVendidos')
    @GET()
    public async getMasVendidos(req: Request, res: Response): Promise<void>{

        try {
            const productosMasVendidos = await this.ventasProductosLocatariosService.getMasVendidos();

            
            const productosReturn: any = [];
            for(let i = 0; i < productosMasVendidos.length; i++) {
                const productoLocatario = await this.productosLocatariosService.findById(productosMasVendidos[i].producto_locatario_id);
              
                const productoGeneral = await this.productoService.findById(productoLocatario.producto_id);
        
                productosReturn.push({
                    locatario_id: productoLocatario.locatario_id,
                    nombre: productoGeneral.nombre,
                    imagen_principal: productoGeneral.imagen_principal,
                    sku: productoGeneral.sku,
                    producto_locatario_id: productosMasVendidos[i].producto_locatario_id,
                    cantidad: productosMasVendidos[i].count,
                    unidad: productoGeneral.unidad
                });
            }

            res.status(200).json({
                ok: true,
                productos: productosReturn
            });
            
        } catch(error) {
            this.handleException(error, res);
        }
    }
}