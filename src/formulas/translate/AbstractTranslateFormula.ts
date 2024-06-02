import {AbstractFormula} from "../AbstractFormula";
import * as coda from "@codahq/packs-sdk";
import {Language} from "../../models/Language";
import {TranslationResponse} from "../../models/TranslationResponse";

export abstract class AbstractTranslateFormula extends AbstractFormula {
	protected readonly parameters = [
		coda.makeParameter({
			name: "text",
			description: "The text to translate.",
			type: coda.ParameterType.String
		}),

		coda.makeParameter({
			name: "targetLanguage",
			description: "The target language.",
			type: coda.ParameterType.String,
			autocomplete: async function (context, search) {
				return getLanguagesAutocomplete(context, "target", search);
			}
		}),

		coda.makeParameter({
			name: "sourceLanguage",
			description: "The source language. Can be omitted to use auto-detect.",
			type: coda.ParameterType.String,
			autocomplete: async function (context, search) {
				return getLanguagesAutocomplete(context, "source", search);
			},
			optional: true
		})
	];

	translate(text: string, targetLanguage: string, sourceLanguage: string, fetcher: coda.Fetcher): Promise<TranslationResponse> {
		return new Promise<TranslationResponse>(async (resolve) => {
			try {
				let response = await fetcher.fetch<TranslationResponse>({
					method: "POST",
					url: "/translate",
					headers: {
						"Content-Type": "application/json",
					},
					body: JSON.stringify({
						text: [text],
						target_lang: targetLanguage,
						source_lang: sourceLanguage
					})
				});

				resolve(response.body);
			} catch (error) {
				this.handleError(error);
			}
		});
	}
}

async function getLanguagesAutocomplete(context: coda.ExecutionContext, type: string, query: string) {
	let response = await context.fetcher.fetch({
		method: "GET",
		url: coda.withQueryParams("/languages", {
			type: type
		}),
		cacheTtlSecs: 60 * 60 // cache for 1 hour
	});

	const languages: Language[] = response.body;
	return coda.autocompleteSearchObjects(query, languages, "name", "language");
}