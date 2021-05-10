import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './pages/auth/login/login.component';
import { AdminAssistantPaymentsComponent } from './pages/dashboard/admin-assistant/admin-assistant-payments/admin-assistant-payments.component';
import { AdminAssistantsComponent } from './pages/dashboard/admin-assistant/admin-assistants/admin-assistants.component';
import { CallCenterPaymentsComponent } from './pages/dashboard/call-center/call-center-payments/call-center-payments.component';
import { CallCenterComponent } from './pages/dashboard/call-center/call-center/call-center.component';
import { CreateQuoteComponent } from './pages/dashboard/client-quotes/create-quote/create-quote.component';
import { EditQuoteComponent } from './pages/dashboard/client-quotes/edit-quote/edit-quote.component';
import { ListQuotesComponent } from './pages/dashboard/client-quotes/list-quotes/clientquotes.component';
import { ClientReportsComponent } from './pages/dashboard/client/client-reports/client-reports.component';
import { ClientsComponent } from './pages/dashboard/client/clients/clients.component';
import { HomeComponent } from './pages/dashboard/home/home.component';
import { PanelComponent } from './pages/dashboard/panel/panel.component';
import { ProviderAssignComponent } from './pages/dashboard/provider/provider-assign/provider-assign.component';
import { ProviderPaymentsComponent } from './pages/dashboard/provider/provider-payments/provider-payments.component';
import { ProviderReportsComponent } from './pages/dashboard/provider/provider-reports/provider-reports.component';
import { ProvidersComponent } from './pages/dashboard/provider/providers/providers.component';
import { QuoteAssignComponent } from './pages/dashboard/quote/quote-assign/quote-assign.component';
import { QuotePaymentsComponent } from './pages/dashboard/quote/quote-payments/quote-payments.component';
import { QuotesComponent } from './pages/dashboard/quote/quotes/quotes.component';

const routes: Routes = [
    {
        path: 'dashboard',
        component: PanelComponent,
        children: [
            {
                path: '',
                redirectTo: 'home',
                pathMatch: 'full'
            },
            {
                path: 'home',
                component: HomeComponent
            },
            {
                path: 'clients',
                component: ClientsComponent
            },
            {
                path: 'clients/reports',
                component: ClientReportsComponent
            },
            {
                path: 'providers',
                component: ProvidersComponent
            },
            {
                path: 'providers/reports',
                component: ProviderReportsComponent
            },
            {
                path: 'providers/assign',
                component: ProviderAssignComponent
            },
            {
                path: 'providers/payments',
                component: ProviderPaymentsComponent
            },
            {
                path: 'quotes',
                component: QuotesComponent
            },
            {
                path: 'quotes/payments',
                component: QuotePaymentsComponent
            },
            {
                path: 'quotes/assign',
                component: QuoteAssignComponent
            },
            {
                path: 'quotes/list',
                component: ListQuotesComponent
            },
            {
                path: 'quotes/settings/:id',
                component: EditQuoteComponent
            },
            {
                path: 'quotes/new',
                component: CreateQuoteComponent
            },
            {
                path: 'admin/assistants',
                component: AdminAssistantsComponent
            },
            {
                path: 'admin/assistants/payments',
                component: AdminAssistantPaymentsComponent
            },
            {
                path: 'callcenters',
                component: CallCenterComponent
            }
            ,
            {
                path: 'callcenters/payments',
                component: CallCenterPaymentsComponent
            }
        ]
    },
    {
        path: '**',
        redirectTo: 'auth/login'
    }
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})
export class AppRoutingModule { }
