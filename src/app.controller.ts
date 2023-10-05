import { BadRequestException, NotFoundException, Controller, Get, Param } from '@nestjs/common';
import { AppService } from './app.service';
import { data, ReportType } from './data';

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
  
  
  
  
  
  
  
  
  
}
