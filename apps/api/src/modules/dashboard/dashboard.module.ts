import { Module } from "@nestjs/common";
import { DashboardService } from "./dashboard.service";
import { DashboardController } from "./dashboard.controller";

@Module({
  imports: [],
  providers: [DashboardService],
  controllers: [DashboardController]
})
export class DashboardModule {}
