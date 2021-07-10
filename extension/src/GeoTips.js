import Lesson from "./components/Lesson.svelte";
import { getGameId, getTipsByCountryCode } from "./utils";

const GAMES_API_URL = "https://www.geoguessr.com/api/v3/games";

export default class GeoTips {
    ms;

    constructor(ms) {
        this.ms = ms;
        this.rendered = false;
    }

    async getLocationCoords(gameId) {
        const location = await fetch(`${GAMES_API_URL}/${gameId}`).then((res) =>
            res.json()
        );
        const coords = location.rounds.reverse()[0];
        return coords;
    }

    async updateCountry(coords) {
        const url = `https://nominatim.openstreetmap.org/reverse?format=json&lat=${coords.lat}&lon=${coords.lng}&zoom=18&addressdetails=1`;
        const data = await fetch(url).then((res) => res.json());
        this.country = data.address.country;
        this.country_code = data.address.country_code;
        this.tips = getTipsByCountryCode(this.country_code);
    }

    async refresh(gameId) {
        const coords = await this.getLocationCoords(gameId);
        await this.updateCountry(coords);
        this.refreshing = false;
    }

    run() {
        setTimeout(() => {
            const target = document.getElementsByClassName("result__bottom")[0];
            this.removeRatingCard()

            if (target && !this.rendered) {
                // this.ratingCssUpdater(target)
                this.render(target);
                this.rendered = true;
                this.country = null;
            }
            if (!target) {
                this.rendered = false;
            }

            const gameId = getGameId();

            if ((!this.country || gameId !== this.gameId) && gameId && !this.refreshing) {
                this.gameId = gameId;
                this.refreshing = true;
                this.refresh(gameId);
            }

            if(!gameId) {
                this.gameId = null
            }

            this.run();
        }, this.ms);
    }

    removeRatingCard() {
        const bottomCard = document.getElementsByClassName("card__footer result__rating-container")[0]
        if(bottomCard) {
            bottomCard.remove()
        }
    }

    render(target) {
        if (this.tips && this.tips.length > 0) {
            new Lesson({
                target,
                props: {
                    country: this.country,
                    tips: this.tips,
                },
            });
        }
    }
}
