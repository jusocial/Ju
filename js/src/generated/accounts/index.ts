export * from './Alias';
export * from './App';
export * from './CollectionItem';
export * from './Connection';
export * from './ExternalProcessorPDA';
export * from './Profile';
export * from './Publication';
export * from './Reaction';
export * from './Report';
export * from './Subspace';

import { ExternalProcessorPDA } from './ExternalProcessorPDA';
import { App } from './App';
import { Profile } from './Profile';
import { Subspace } from './Subspace';
import { Publication } from './Publication';
import { Connection } from './Connection';
import { CollectionItem } from './CollectionItem';
import { Alias } from './Alias';
import { Reaction } from './Reaction';
import { Report } from './Report';

export const accountProviders = {
  ExternalProcessorPDA,
  App,
  Profile,
  Subspace,
  Publication,
  Connection,
  CollectionItem,
  Alias,
  Reaction,
  Report,
};
