import {AbstractTranslateFormula} from "./AbstractTranslateFormula";
import * as coda from "@codahq/packs-sdk";

export class PlainTranslateFormula extends AbstractTranslateFormula {
	register(pack: coda.PackDefinitionBuilder) {
		pack.addFormula({
			name: "PlainTranslate",
			description: "Translate text.",
			resultType: coda.ValueType.String,
			cacheTtlSecs: 60 * 15, // cache for 15 minutes
			// @ts-ignore
			parameters: this.parameters,
			execute: async ([text, targetLanguage, sourceLanguage], context) => {
				const response = await this.translate(text as string, targetLanguage, sourceLanguage, context.fetcher);
				return response.translations[0].text;
			}
		})
	}
}