import * as coda from "@codahq/packs-sdk";
import {AbstractFormula} from "./AbstractFormula";

export class UsageFormula extends AbstractFormula {
	register(pack: coda.PackDefinitionBuilder) {
		pack.addFormula({
			name: "Usage",
			description: "Get API usage for your account.",
			resultType: coda.ValueType.Object,
			schema: coda.makeObjectSchema({
				properties: {
					character_count: {type: coda.ValueType.Number},
					character_limit: {type: coda.ValueType.Number},
					document_limit: {type: coda.ValueType.Number},
					document_count: {type: coda.ValueType.Number},
					team_document_limit: {type: coda.ValueType.Number},
					team_document_count: {type: coda.ValueType.Number},
				}
			}),
			parameters: [],
			execute: async ([], context) => {
				try {
					let response = await context.fetcher.fetch({
						method: "GET",
						url: "/usage"
					});

					return response.body;
				} catch (error) {
					this.handleError(error);
				}
			}
		})
	}
}