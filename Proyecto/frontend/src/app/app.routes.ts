import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { Home } from './pages/users/home/home';
import { Catalogo } from './pages/users/catalogo/catalogo';
import { ProdExtra } from './pages/users/prod-extra/prod-extra';
import { ProdOro } from './pages/users/prod-oro/prod-oro';
import { ProdPlata } from './pages/users/prod-plata/prod-plata';
import { Contact } from './pages/users/contact/contact';

import { LogIn } from './pages/guest/log-in/log-in';
import { SignUp } from './pages/guest/sign-up/sign-up';

import { Historial } from './pages/logged/historial/historial';
import { Profile } from './pages/logged/profile/profile';
import { Request } from './pages/logged/request/request';

import { CreateProduct } from './pages/admin/create-product/create-product';
import { ModifyProduct } from './pages/admin/modify-product/modify-product';
import { Products } from './pages/admin/products/products';

export const routes: Routes = [
    { path: "", component: Home },
    { path: "catalogo", component: Catalogo },
    { path: "secc_oro", component: ProdOro },
    { path: "secc_plt", component: ProdPlata },
    { path: "secc_ext", component: ProdExtra },
    { path: "acerca_de", component: Contact },

    { path: "login", component: LogIn },
    { path: "signup", component: SignUp },

    { path: "historial", component: Historial },
    { path: "profile", component: Profile },
    { path: "request", component: Request },

    { path: "admin/create-stock", component: CreateProduct },
    { path: "admin/modify-stock", component: ModifyProduct },
    { path: "admin/products", component: Products }
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})
export class AppRoutingModule { }
