import * as coda from "@codahq/packs-sdk";
import {TranslateFormula} from "./src/formulas/translate/TranslateFormula";
import {UsageFormula} from "./src/formulas/UsageFormula";
import {PlainTranslateFormula} from "./src/formulas/translate/PlainTranslateFormula";

export const pack = coda.newPack();

pack.addNetworkDomain("deepl.com");

pack.setUserAuthentication({
	type: coda.AuthenticationType.CustomHeaderToken,
	headerName: "Authorization",
	tokenPrefix: "DeepL-Auth-Key",

	postSetup: [{
		type: coda.PostSetupType.SetEndpoint,
		name: "SelectAccountType",
		description: "Select your account type:",
		getOptions: async () => [
			{
				display: "Free",
				value: "https://api-free.deepl.com/v2"
			},
			{
				display: "Pro",
				value: "https://api.deepl.com/v2"
			}
		],
	}]
});

new UsageFormula().register(pack);
new TranslateFormula().register(pack);
new PlainTranslateFormula().register(pack);