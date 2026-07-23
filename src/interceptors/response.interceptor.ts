import { CallHandler, ExecutionContext, Injectable, NestInterceptor } from "@nestjs/common";
import { Observable } from "rxjs";
import { map } from "rxjs/operators"

const EXCLUDE_DATA_METHODS = ['POST', 'PATCH', 'PUT', 'DELETE'];

@Injectable()
export class ResponseInterceptor implements NestInterceptor {
    intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
        const req = context.switchToHttp().getRequest();
        const res = context.switchToHttp().getResponse();

        return next.handle().pipe(map(data => {
            const base = {
                response_code: res.statusCode,
                message: this.getMessage(req.method, res.statusCode)
            }

            if (EXCLUDE_DATA_METHODS.includes(req.method)) {
                return base
            }

            return {
                response_code: res.statusCode,
                data: data ?? null,
                message: this.getMessage(req.method, res.statusCode)
            }
        }))
    }

    private getMessage(method: string, statusCode: number): string {
        if (statusCode >= 200 && statusCode < 300) {
            switch (method) {
                case "POST":
                    return "Data created successfully"
                case "PATCH":
                case "PUT":
                    return "Data updated successfully"
                case "DELETE":
                    return "Data deleted successfully"
                default:
                    return "Success"
            }
        }
        return "Failed"
    }
}