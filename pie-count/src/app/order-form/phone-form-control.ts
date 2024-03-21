import { FormControl } from "@angular/forms";

export class PhoneFormControl extends FormControl {
    override setValue(value: string, options?: { onlySelf?: boolean | undefined; emitEvent?: boolean | undefined; emitModelToViewChange?: boolean | undefined; emitViewToModelChange?: boolean | undefined } | undefined): void {
        if (!value) {
            return super.setValue('', { ...options, emitModelToViewChange: true })
        }

        console.log(`Typed Value:  ${value} \n Typed value length: ${value.length}`)
        console.log(`Current value: ${this.value} \n Current value length: ${this.value.length}`)

        if (!value.match(/^(?=.*[0-9])[-()0-9]+$/) || value.length > 13) {
            return super.setValue(this.value, {...options, emitModelToViewChange: true})
        }

        if (value.length === 12 && this.value.length === 13) {
            return super.setValue(value.slice(1, 4) + value.slice(5, 8) + value.slice(9, 12), {...options, emitModelToViewChange: true})
        }

        if (value.length === 10 && this.value.length === 9) {
            return super.setValue(`(${value.slice(0, 3)})${value.slice(3, 6)}-${value.slice(6, 10)}`, { ...options, emitModelToViewChange: true })
        }

        return super.setValue(value, {...options, emitModelToViewChange: true})
    }
}
