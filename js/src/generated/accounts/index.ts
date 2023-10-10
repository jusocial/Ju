export * from './Alias';
export * from './App';
export * from './CollectionItem';
export * from './Connection';
export * from './DeveloperWhitelistItem';
export * from './ExternalProcessorPDA';
export * from './Profile';
export * from './Publication';
export * from './Reaction';
export * from './Report';
export * from './Subspace';
export * from './SubspaceManager';

import { DeveloperWhitelistItem } from './DeveloperWhitelistItem';
import { ExternalProcessorPDA } from './ExternalProcessorPDA';
import { App } from './App';
import { Profile } from './Profile';
import { Subspace } from './Subspace';
import { SubspaceManager } from './SubspaceManager';
import { Publication } from './Publication';
import { Connection } from './Connection';
import { CollectionItem } from './CollectionItem';
import { Alias } from './Alias';
import { Reaction } from './Reaction';
import { Report } from './Report';

export const accountProviders = {
  DeveloperWhitelistItem,
  ExternalProcessorPDA,
  App,
  Profile,
  Subspace,
  SubspaceManager,
  Publication,
  Connection,
  CollectionItem,
  Alias,
  Reaction,
  Report,
};
