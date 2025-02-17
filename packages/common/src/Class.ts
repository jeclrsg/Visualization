import { classID2Meta, ClassMeta } from "@hpcc-js/util";

function applyMixins(derivedCtor: any, baseCtors: any[]) {
    baseCtors.forEach(baseCtor => {
        Object.getOwnPropertyNames(baseCtor).forEach(name => {
            if (name !== "constructor") {
                const descriptor = Object.getOwnPropertyDescriptor(baseCtor, name);
                Object.defineProperty(derivedCtor, name, descriptor);
            }
        });
    });
}

export class Class {
    _class: string;

    class(): string;
    class(_: string): this;
    class(_?: string): string | this {
        if (!arguments.length) return this._class;
        this._class = _;
        return this;
    }

    classID() {
        return this._class.split(" ").pop();
    }

    classMeta(): ClassMeta {
        return classID2Meta(this.classID());
    }

    implements(source) {
        applyMixins(this, [source]);
    }

    mixin(mixinClass) {
        this.implements(mixinClass.prototype);
        //  Special case mixins  ---
        if (mixinClass.prototype.hasOwnProperty("_class")) {
            this._class += " " + mixinClass.prototype._class.split(" ").pop();
        }
    }

    overrideMethod<M extends keyof this>(methodID: M, newMethod: this[M]): this {
        if (this[methodID] === undefined) {
            throw new Error(`Method:  ${methodID.toString()} does not exist.`);
        }
        const origMethod = this[methodID];
        this[methodID] = function () {
            arguments[arguments.length] = origMethod;
            arguments.length++;
            return (newMethod as any).apply(this, arguments);
        } as any;
        return this;
    }

    cssTag(id: string): string {
        return ("" + id).replace(/[^a-z0-9]/g, (s) => {
            const c = s.charCodeAt(0);
            if (c === 32) return "-";
            if (c >= 65 && c <= 90) return "_" + s.toLowerCase();
            return "_0x" + c.toString(16);
        });
    }
}
Class.prototype._class = "common_Class";
