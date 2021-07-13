import { Request, Response } from 'express';
import { route, GET } from 'awilix-express';

import { BaseController } from '../common/controllers/base.controller';

import { VentasProductosLocatariosService } from '../services/ventasProductosLocatarios.service';
import { ProductosLocatariosService } from '../services/productosLocatarios.service';
import { LocatarioService } from '../services/locatarios.service';
import { VentasProductosLocatarios } from '../services/repositories/domain/ventasProductoLocatarios.domain';

@route('/ventaProductoLocatarios')
export class VentaProductosLocatariosController extends BaseController{
   
    constructor(private readonly ventasProductosLocatariosService: VentasProductosLocatariosService,
                private readonly productosLocatariosService: ProductosLocatariosService,
                private readonly locatarioService: LocatarioService){
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
   
    @route('/getMasVendidos')
    @GET()
    public async getMasVendidos(req: Request, res: Response): Promise<void>{

        try {
            const productosMasVendidos = await this.ventasProductosLocatariosService.getMasVendidos();

            
            const productosReturn: any = [];
            
            productosMasVendidos.map(async (product: VentasProductosLocatarios) => {
                const productoLocatario = await this.productosLocatariosService.findById(product.producto_locatario_id);
                if(productoLocatario) {
                    const productoGeneral = await this.locatarioService.findById(productoLocatario.locatario_id);
                    
                    if(productoGeneral && productoGeneral.plaza_id){
                        productosReturn.push({
                            plaza_id: productoGeneral.plaza_id,
                            product
                        });
                        // console.log('============');
                        // console.log({
                        //     plaza_id: productoGeneral.plaza_id,
                        //     product
                        // });
                    }
                }
            });

            console.log(productosReturn);
       
                

            res.status(200).json({
                ok: true,
                productosMasVendidos
            });
        } catch(error) {
            this.handleException(error, res);
        }
    }
}