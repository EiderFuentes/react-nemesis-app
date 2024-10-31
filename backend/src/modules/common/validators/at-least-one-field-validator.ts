import { registerDecorator, ValidationOptions, ValidationArguments } from 'class-validator';

// Decorador personalizado
export function IsAnyFieldTrueInDisplacement(validationOptions?: ValidationOptions) {
    return function (object: Object, propertyName: string) {
        registerDecorator({
            name: 'isAnyFieldTrueInDisplacement',
            target: object.constructor,
            propertyName: propertyName,
            options: validationOptions,
            validator: {
                validate(value: any, args: ValidationArguments) {
                    if (!Array.isArray(value) || value.length === 0) {
                        return false;
                    }

                    // Validar que al menos un campo tenga el valor "S"
                    return value.some((item) =>
                        Object.values(item).some((val) => val === "S")
                    );
                },
                defaultMessage(args: ValidationArguments) {
                    return `At least one field in ${args.property} must be "S"`;
                },
            },
        });
    };
}
