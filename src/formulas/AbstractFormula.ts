import * as coda from "@codahq/packs-sdk";
import {PackDefinitionBuilder} from "@codahq/packs-sdk";

export abstract class AbstractFormula {
	abstract register(pack: PackDefinitionBuilder): void;

	protected handleError(error: any) {
		if (error.statusCode) {
			let statusError = error as coda.StatusCodeError;
			let message = statusError.body?.message;
			if (message) {
				throw new coda.UserVisibleError(message);
			}
		}
		throw error;
	}
}