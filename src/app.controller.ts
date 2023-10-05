import { BadRequestException, Controller, Get, Param } from '@nestjs/common';
import { AppService } from './app.service';
import { data, ReportType } from './data';

@Controller("report/:type")
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getAllReports(
    @Param("type") type: string
  ) {
    if (type !== 'income' && type !== 'expense') {
      throw new BadRequestException('Invalid report type. Accepted types are: income, expense');
  }
      const reportType = type === "income" ? ReportType.INCOME : ReportType.EXPENSE;
      return data.report.filter((report) => report.type === reportType)
  }
}
 