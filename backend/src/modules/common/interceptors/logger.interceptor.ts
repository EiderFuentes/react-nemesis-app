import {
    Injectable,
    NestInterceptor,
    ExecutionContext,
    CallHandler,
    Logger,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';

/**
 * Esta clase imprime en consola el nombre el endpoint que se está consumiendo
 */
@Injectable()
export class LoggerInterceptor implements NestInterceptor {
    /** Variable privada para imprimir en consola */
    private logger = new Logger();

    constructor(
    ) { }

    intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
        const { method, url, user } = context.switchToHttp().getRequest();
        const now = Date.now();
        return next
            .handle()
            .pipe(
                tap(() =>
                    this.logger.log(
                        `${method} ${url} +${Date.now() - now}ms  (${user?.usuario || ''})`,
                        context.getClass().name,
                    ),
                ),
            );
    }
}
