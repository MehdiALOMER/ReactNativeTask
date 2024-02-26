export interface ITag {
    Id: number;
    Name: string;
    Rank: number;
    IconUrl: string;
};

export interface IPromotionList {
    BrandIconColor: string;
    BrandIconUrl: string;
    BrandPromotionCardParticipationText: string;
    Id: number;
    ImageUrl: string;
    PromotionCardColor: string;
    RemainingText: string;
    SeoName: string;
    Title: string;
    ScenarioType: string;
    Unavailable: boolean;
    Unvisible: boolean;
    ListButtonText: string;
    ListButtonTextBackGroudColor: string;
    CardType: string;
    ExternalUrl: string;
    IsLuckyDay: boolean;
    LuckyDayText: string;
    LuckyDayTextColor: string | null;
    LuckyDayBackgroundColor: string | null;
};

export interface IPromotion {
    BrandIconColor: string;
    BrandIconUrl: string;
    BrandPromotionCardParticipationText: string;
    Description: string;
    EndDate: string;
    Id: number;
    ImageUrl: string;
    CountryTimeZone: number;
    RemainingText: string;
    StartDate: string;
    Title: string;
    Type: string;
    ScenarioType: string;
    SeoName: string;
    Unavailable: boolean;
    IsMapAvailable: boolean;
    Unvisible: boolean;
    DetailButtonText: string;
    ListButtonText: string | null;
    LuckyDayText: string;
    LuckyDayTextColor: string | null;
    LuckyDayBackgroundColor: string | null;
    PromotionDetailItemAreas: IPromotionDetailItemArea[];
    Contents: any[];
    PromotionTags: any[];
    PromotionGalleries: IPromotionGallery[];
    NextFlowConfigurations: object;
    GameWin: null;
};

interface IPromotionDetailItemArea {
    Title: string;
    Description: string;
    OpenedIconUrl: string;
    ClosedIconUrl: string;
    UseMapButton: boolean;
    PromotionDetailItems: IPromotionDetailItem[];
};

interface IPromotionDetailItem {
    Title: string;
    Description: string;
    ImageUrl: string;
};

interface IPromotionGallery {
    DocumentUrl: string;
    DocumentType: string;
    CoverImageUrl: string;
};