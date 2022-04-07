import gql from "graphql-tag";

export const getBridgeworldMetadata = gql`
  query getBridgeworldMetadata($ids: [ID!]!) {
    tokens(first: 1000, where: { id_in: $ids }) {
      id
      image
      name
      tokenId
      metadata {
        __typename
        ... on LegionInfo {
          boost
          cooldown
          constellation {
            dark
            earth
            fire
            light
            water
            wind
          }
          crafting
          questing
          summons
          rarity
          role
          type
          summons
          questingXp
          craftingXp
        }
        ... on ConsumableInfo {
          id
          type
          size
        }
        ... on TreasureInfo {
          id
          boost
          category
          tier
        }
      }
    }
  }
`;

export const getFilteredLegions = gql`
  query getFilteredLegions(
    $legionInfo: LegionInfo_filter!
    $constellation: Constellation_filter!
  ) {
    constellations(first: 1000, where: $constellation) {
      id
    }
    legionInfos(first: 1000, where: $legionInfo) {
      id
    }
  }
`;

export const getFilteredTreasures = gql`
  query getFilteredTreasures($filters: TreasureInfo_filter!) {
    treasureInfos(first: 200, where: $filters) {
      id
    }
  }
`;
export const getTreasureBoosts = gql`
  query getTreasureBoosts {
    treasureInfos(first: 200, orderBy: boost) {
      boost
    }
  }
`;
