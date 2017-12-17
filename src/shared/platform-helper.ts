import { PlatformModel } from './../models/platform';

export class PlatformHelper {
    static getPlatformDisplayName(platform: PlatformModel) {
        if (platform.alternative_name) {
            if (platform.alternative_name === 'mswin') {
                return 'PC';
            }

            return platform.alternative_name;
        } else {
            if (platform.name === 'Playstation 3') {
                return 'PS3';
            }
        }

        return platform.name;
    }
}