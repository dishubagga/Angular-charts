import { Component, OnInit } from "@angular/core";
import { EChartOption } from "echarts";
import { Subscription } from "rxjs";
import { ChartService } from "./chart.service";
import { BasicLineChartModel } from "../models/linechart.model";
@Component({
  selector: "app-chart",
  templateUrl: "./chart.component.html",
  styleUrls: ["./chart.component.css"],
  providers: [ChartService],
})
export class ChartComponent implements OnInit {
  constructor() {}

  ngOnInit(): void {}
}
