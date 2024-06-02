import * as coda from "@codahq/packs-sdk";
import {AbstractTranslateFormula} from "./AbstractTranslateFormula";

export class TranslateFormula extends AbstractTranslateFormula {
	register(pack: coda.PackDefinitionBuilder) {
		pack.addFormula({
			name: "Translate",
			description: "Translate text (=> Use PlainTranslate if you only want the translation and nothing else).",
			resultType: coda.ValueType.Object,
			schema: coda.makeObjectSchema({
				displayProperty: "text",
				properties: {
					text: {type: coda.ValueType.String},
					source_language: {type: coda.ValueType.String},
					target_language: {type: coda.ValueType.String},
					auto_detect: {type: coda.ValueType.Boolean},
				}
			}),
			cacheTtlSecs: 60 * 15, // cache for 15 minutes
			// @ts-ignore
			parameters: this.parameters,
			execute: async ([text, targetLanguage, sourceLanguage], context) => {
				const response = await this.translate(text as string, targetLanguage, sourceLanguage, context.fetcher);
				return {
					text: response.translations[0].text,
					source_language: response.translations[0].detected_source_language,
					target_language: targetLanguage,
					auto_detect: !sourceLanguage
				}
			}
		})
	}
}