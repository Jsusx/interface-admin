import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PanelComponent } from './panel/panel.component';
import { ClientsComponent } from './client/clients/clients.component';
import { RouterModule } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ProviderAssignComponent } from './provider/provider-assign/provider-assign.component';
import { EditQuoteComponent } from './client-quotes/edit-quote/edit-quote.component';
import { ListQuotesComponent } from './client-quotes/list-quotes/clientquotes.component';
import { CreateQuoteComponent } from './client-quotes/create-quote/create-quote.component';
import { QuoteAssignComponent } from './quote/quote-assign/quote-assign.component';
import { CallCenterComponent } from './call-center/call-center/call-center.component';
import { ProvidersComponent } from './provider/providers/providers.component';
import { QuotesComponent } from './quote/quotes/quotes.component';
import { CallCenterPaymentsComponent } from './call-center/call-center-payments/call-center-payments.component';
import { QuotePaymentsComponent } from './quote/quote-payments/quote-payments.component';
import { AdminAssistantsComponent } from './admin-assistant/admin-assistants/admin-assistants.component';
import { AdminAssistantPaymentsComponent } from './admin-assistant/admin-assistant-payments/admin-assistant-payments.component';
import { ProviderPaymentsComponent } from './provider/provider-payments/provider-payments.component';
import { ProviderReportsComponent } from './provider/provider-reports/provider-reports.component';
import { ClientReportsComponent } from './client/client-reports/client-reports.component';



@NgModule({
    declarations: [
        PanelComponent,
        ClientsComponent,
        HomeComponent,
        ProviderAssignComponent,
        QuoteAssignComponent,
        ListQuotesComponent,
        EditQuoteComponent,
        CreateQuoteComponent,
        AdminAssistantsComponent,
        CallCenterComponent,
        ProvidersComponent,
        QuotesComponent,
        CallCenterPaymentsComponent,
        QuotePaymentsComponent,
        AdminAssistantPaymentsComponent,
        ProviderPaymentsComponent,
        ProviderReportsComponent,
        ClientReportsComponent,
    ],
    imports: [
        CommonModule,
        RouterModule,
        NgbModule,
        ReactiveFormsModule,
        FormsModule
    ]
})
export class DashboardModule { }
