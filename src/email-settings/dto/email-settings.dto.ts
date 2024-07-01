import { IsBoolean, IsNotEmpty } from 'class-validator';
import { ObjectId } from 'mongoose';

export class CreateEmailSettingsDto {

  @IsBoolean()
  sendRecruitmentNotification: boolean;

  @IsBoolean()
  sendCVReceiptNotification: boolean;

  @IsBoolean()
  sendInterviewConfirmation: boolean;

  @IsBoolean()
  sendRecruitmentStatusUpdate: boolean;

  @IsBoolean()
  sendTaskAssignment: boolean;

  @IsBoolean()
  sendTaskStatusUpdate: boolean;

  @IsBoolean()
  sendApprovalRequest: boolean;

  @IsBoolean()
  sendFeedbackToEmployee: boolean;

  @IsBoolean()
  sendNewCourseNotification: boolean;

  @IsBoolean()
  sendTrainingInvitation: boolean;

  @IsBoolean()
  sendTrainingStatusUpdate: boolean;

  @IsBoolean()
  sendAttendanceReportUpdate: boolean;

  @IsBoolean()
  sendSalaryCalculationUpdate: boolean;

  @IsBoolean()
  sendPaymentTransferConfirmation: boolean;
}