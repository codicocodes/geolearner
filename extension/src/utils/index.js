import {tips} from "../test-utils/data"
const PARTIAL_GEOGUESSR_URL = "www.geoguessr.com/game/";
const GEOGUESSR_GAME_REGEX = /https?:\/\/www.geoguessr.com\/game\/\w+/;

export function validateGameUrl(url) {
    return GEOGUESSR_GAME_REGEX.test(url);
}

export function getTabUrl() {
    return window.location.href;
}

export function getGameId() {
    const url = getTabUrl();
    const isGameUrl = validateGameUrl(url);
    if (isGameUrl) {
        const id = url.split(PARTIAL_GEOGUESSR_URL)[1];
        return id;
    }
}

export function getTipsByCountryCode(_code) {
    return tips
}

