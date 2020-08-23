import { BrowserModule } from "@angular/platform-browser";
import { NgModule } from "@angular/core";
import { NgxEchartsModule } from "ngx-echarts";
import { HttpClientModule } from "@angular/common/http";
import { AppRoutingModule } from "./app-routing.module";
import { AppComponent } from "./app.component";
import { ChartComponent } from "./chart/chart.component";

@NgModule({
  declarations: [AppComponent, ChartComponent],
  imports: [
    HttpClientModule,
    BrowserModule,
    AppRoutingModule,
    NgxEchartsModule.forRoot({
      /**
       * This will import all modules from echarts.
       * If you only need custom modules,
       * please refer to [Custom Build] section.
       */
      echarts: () => import("echarts"), // or import('./path-to-my-custom-echarts')
    }),
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
