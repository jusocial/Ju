import * as beet from '@metaplex-foundation/beet';
export declare enum ProcessorType {
    Registering = 0,
    Connecting = 1,
    Publishing = 2,
    Collecting = 3,
    Referencing = 4
}
export declare const processorTypeBeet: beet.FixedSizeBeet<ProcessorType, ProcessorType>;
