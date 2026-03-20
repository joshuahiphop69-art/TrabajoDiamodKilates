import { Routes } from '@angular/router';
import { Home } from './pages/home/home';
import { Catalogo } from './pages/catalogo/catalogo';
import { ProdExtra } from './pages/prod-extra/prod-extra';
import { ProdOro } from './pages/prod-oro/prod-oro';
import { ProdPlata } from './pages/prod-plata/prod-plata';
import { LogIn } from './pages/log-in/log-in';
import { Contact } from './pages/contact/contact';
import { CartComponent } from './pages/cart/cart.component';
import { CheckoutComponent } from './pages/checkout/checkout.component';

export const routes: Routes = [
    { path: "", component: Home },
    { path: "catalogo", component: Catalogo },
    { path: "secc_oro", component: ProdOro },
    { path: "secc_plt", component: ProdPlata },
    { path: "secc_ext", component: ProdExtra },
    { path: "compras-pedidos", component: CartComponent },
    { path: "checkout", component: CheckoutComponent },
    { path: "login", component: LogIn },
    { path: "acerca_de", component: Contact }
];
