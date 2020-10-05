import { Component, OnInit } from "@angular/core";
import { BasicLineChartModel } from "src/app/models/linechart.model";
import { Subscription } from "rxjs";
import { EChartOption } from "echarts";
import { ChartService } from "../chart.service";

@Component({
  selector: "app-dynamic-chart",
  templateUrl: "./dynamic-chart.component.html",
  styleUrls: ["./dynamic-chart.component.css"],
  providers: [ChartService],
})
export class DynamicChartComponent implements OnInit {
  static readonly GRID_SETTINGS: any = {
    left: "3%",
    right: "4%",
    bottom: "3%",
    containLabel: true,
  };
  private _data = [1, 2, 20];

  private _xAxisData = ["Mon", "Tue", "Wed", "Thrs", "Fri"];
  private _subscription: Subscription;
  _chartOption: EChartOption;

  constructor(private chartService: ChartService) {}

  ngOnInit(): void {
    this.chartService.getLineChartData().subscribe((data) => {
      this._initDynamicChart(data);
    });
  }
  private _initDynamicChart(chartData: BasicLineChartModel[]): void {
    this._chartOption = {
      title: {
        text: "Line chart",
      },
      tooltip: {
        trigger: "axis",
      },
      legend: {
        data: chartData.map((el) => {
          return el.xPathName;
        }),
      },
      grid: DynamicChartComponent.GRID_SETTINGS,
      xAxis: {
        type: "category",
        boundaryGap: false,
        data: this._xAxisData,
      },
      yAxis: {
        type: "value",
        splitLine: {
          show: false,
        },
      },
      series: [
        {
          name: "Dynamic line",
          type: "line",
          showSymbol: false,
          hoverAnimation: false,
          data: this._data,
        },
      ],
    };
  }
}
