import { MediaMatcher } from '@angular/cdk/layout';
import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { Observable, Subscription } from 'rxjs';
import { accesoDirecto,listarModuloDTO, menuListaDTO } from 'src/app/Modulo-seguridad/Models/seg-login.model';
import { SegLoginService } from 'src/app/Modulo-seguridad/Services/seg-login.service';
import { StorageService } from 'src/app/Modulo-seguridad/Services/storage.service';
import { UserContextService } from 'src/app/Modulo-seguridad/Services/user-context.service';

@Component({
  selector: 'app-seg-menuprincipal',
  templateUrl: './seg-menuprincipal.component.html',
  styleUrls: ['./seg-menuprincipal.component.css']
})
export class SegMenuprincipalComponent implements OnInit {
  mobileQuery: MediaQueryList;
  viewUserMenu:boolean = false;
  shouldRun:boolean = true;
  usuario:string='';
  idUsuario:number=0;
  subscription!: Subscription;
  modeloModulo:listarModuloDTO= new listarModuloDTO();
  modeloModuloHijo:listarModuloDTO= new listarModuloDTO();
  modeloModuloList:listarModuloDTO[]=[];
  modeloModuloHijoList:listarModuloDTO[]=[];
  modeloModuloNew:listarModuloDTO[]=[];

  codigoAcceso:string='';
  accesoDirecto:accesoDirecto[]=[];

  nomAmbiente:string='';

  listUserProfile=[
    {id:1,icono:"",nombre:"Datos de la cuenta",ruta:"datos-cuenta"},
    {id:2,icono:"",nombre:"Usuarios",ruta:"seg-usuario"},
    {id:3,icono:"",nombre:"Cerrar sesión",ruta:"/login"}
  ]

  menuList: Observable<menuListaDTO[]> | undefined;
  private _mobileQueryListener: () => void;

      constructor(changeDetectorRef: ChangeDetectorRef,
      media: MediaMatcher,
      private router: Router,
      private storageService: StorageService,
      private readonly userContextService: UserContextService,
      private readonly loginService: SegLoginService,
      private dialog: MatDialog,
      ) {

      this.mobileQuery = media.matchMedia('(max-width: 600px)');
      this._mobileQueryListener = () => changeDetectorRef.detectChanges();
      this.mobileQuery.addListener(this._mobileQueryListener);
    }

  ngOnInit(): void {
    this.usuario=this.storageService.getItemDecrypt('usuario');
    this.idUsuario=this.storageService.getItemDecrypt('idUsuario');
    this.modeloModuloNew=this.storageService.getItem('menu');
    this.accesoDirecto=this.storageService.getItem('accesoDirecto');
  }

  selModulo(item: any){
    this.ocultaMenuUser();
    if (item.url != ''){
      this.storageService.setItemEncrypt('idModulo', item.idModulo);
      this.router.navigate(['main/' + item.url]);
    }
  }
  accesoDirectoSel(event:any){
    if (event.keyCode == 13)
    {
      //console.log(this.codigoAcceso)
      let acceso=this.accesoDirecto.filter(obj=> obj.codigoAccesoDirecto ==this.codigoAcceso);
      this.codigoAcceso='';
      //console.log(acceso.length);
      if (acceso.length <= 0) {return;};
      if (acceso[0].url != ''){
        this.storageService.setItemEncrypt('idModulo', acceso[0].idModulo);
        this.router.navigate(['main/' + acceso[0].url]);
      }
    }
  }
  logout(){
      this.userContextService.logout();
  }
  verMenuUser(){
    if(this.viewUserMenu == false){
      this.viewUserMenu = true;
    }
    else{
      this.viewUserMenu = false;
    }
  }
  ocultaMenuUser(){
    this.viewUserMenu = false;
  }
}
