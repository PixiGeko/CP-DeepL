export interface TranslationResponse {
	translations: Translation[];
}

export interface Translation {
	text: string;
	detected_source_language: string;
}