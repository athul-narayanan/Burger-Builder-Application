import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { AppDropdownDirective } from "../app-dropdown.directive";
import { CssSpinnerComponent } from "../css-spinner/css-spinner.component";

@NgModule({
    declarations : [
        AppDropdownDirective,
        CssSpinnerComponent,
    ],
    imports : [
       CommonModule
    ],
    exports:[
        AppDropdownDirective,
        CssSpinnerComponent,
        CommonModule
    ]
})
export class SharedModule{

}