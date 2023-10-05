import { BadRequestException, NotFoundException, Controller, Body, Get, Param, Post } from '@nestjs/common';
import { AppService } from './app.service';
import { data, ReportType } from './data';
import { v4 as uuid } from 'uuid';

@Controller('report/:type')
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getAllReports(@Param('type') type: string) {
    if (type !== 'income' && type !== 'expense') {
      throw new BadRequestException(
        'Invalid report type. Accepted types are: income, expense',
      );
    }
    const reportType =
      type === 'income' ? ReportType.INCOME : ReportType.EXPENSE;
    return data.report.filter((report) => report.type === reportType);
  }

  @Get(':id')
  getReportById(@Param('type') type: string, @Param('id') id: string) {
  
      if (type !== 'income' && type !== 'expense') {
          throw new BadRequestException('Invalid report type. Accepted types are: income, expense');
      }
  
      const reportType = type === 'income' ? ReportType.INCOME : ReportType.EXPENSE;
  
      const report = data.report
          .filter((report) => report.type === reportType)
          .find((report) => report.id === id);
  
      if (!report) {
          throw new NotFoundException(`Report with id ${id} not found.`);
      }
  
      return report;
  }
  
  @Post()
  createReport(
    @Body() { amount, source }: {
      amount: number
      source: string
    }, @Param('type') type: string
  ) {
    if (type !== 'income' && type !== 'expense') {
      throw new BadRequestException(
        'Invalid report type. Accepted types are: income, expense',
      );
    }
    const newReport = {
      id: uuid(),
      amount,
      source,
      created_at: new Date(),
      updated_at: new Date(),
      type: type === "income" ? ReportType.INCOME : ReportType.EXPENSE
    }
    data.report.push(newReport)
    return newReport;
  }
  
  
  
  
  
  
}
