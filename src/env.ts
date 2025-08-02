import { Env as DefaultEnv} from "hono"
import { SecretsManagerHelper } from "./middleware/SecretsManager"

export interface Env extends DefaultEnv {
    Variables: {
        "secretsManager": SecretsManagerHelper
    }
}