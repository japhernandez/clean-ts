import {MongoAdapter} from "../infrastructure/driven_adapters/mongo-repository/service/mongo-adapter";
import env from "./config/env";


MongoAdapter
    .connect(env.MONGO_URL)
    .then(async () => {
        console.log('Connected DB')
        const app = (await import('./config/appSetup')).default
        app.listen(env.PORT, () => console.log(`Server an running on port: ${env.PORT}`))
    })
    .catch(error => console.log(error))