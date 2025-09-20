import { Component } from '@angular/core';
import { UserContextService } from './Modulo-seguridad/Services/user-context.service';
import { UsuarioContext } from './Modulo-seguridad/Models/seg-login.model';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'SIGEWEBFE';

  constructor(private userContextService: UserContextService) {
    const user = this.userContextService['storageService'].getItemDecrypt('currentUser');
    if (user) {
      this.userContextService.setUser(user as UsuarioContext);
    }
  }
}
