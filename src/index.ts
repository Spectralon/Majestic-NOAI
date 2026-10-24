import {BootstrapService} from "./infrastructure/BootstrapService";

new BootstrapService().main().catch(err => {
    console.log(`Server Error: ${err}`);
    process.exit(1);
});