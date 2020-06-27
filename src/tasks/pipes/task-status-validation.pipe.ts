import { PipeTransform, BadRequestException } from "@nestjs/common";
import { TaskStatus } from "../task-status.enum";

export class TaskStatusValidationPipe implements PipeTransform {
    readonly allowedStatuses = [
        TaskStatus.DONE,
        TaskStatus.IN_PROGRESS,
        TaskStatus.OPEN
    ]

    transform(value: string): string {
        value = value.toUpperCase()

        if (!this.isStatusValid(value)) {
            throw new BadRequestException(`"${value}" is an invalid status`)
        }
        return value
    }

    private isStatusValid (status: any) {
        const idx = this.allowedStatuses.indexOf(status)
        return idx !== -1
    }
}