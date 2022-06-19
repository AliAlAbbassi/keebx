import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
export type Maybe<T> = T | null;
export type Exact<T extends { [key: string]: unknown }> = {
  [K in keyof T]: T[K];
};
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & {
  [SubKey in K]?: Maybe<T[SubKey]>;
};
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & {
  [SubKey in K]: Maybe<T[SubKey]>;
};
const defaultOptions = {};
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
};

export type Ask = {
  __typename?: 'Ask';
  askId: Scalars['Float'];
  askPrice: Scalars['Float'];
  userId: Scalars['Float'];
  keebId: Scalars['Float'];
  title: Scalars['String'];
  ticker: Scalars['String'];
  createdAt: Scalars['String'];
  updatedAt: Scalars['String'];
};

export type Bid = {
  __typename?: 'Bid';
  bidId: Scalars['Float'];
  bidPrice: Scalars['Float'];
  userId: Scalars['Float'];
  keebId: Scalars['Float'];
  title: Scalars['String'];
  ticker: Scalars['String'];
  createdAt: Scalars['String'];
  updatedAt: Scalars['String'];
};

export type FieldError = {
  __typename?: 'FieldError';
  field: Scalars['String'];
  message: Scalars['String'];
};

export type Keeb = {
  __typename?: 'Keeb';
  id: Scalars['Float'];
  title: Scalars['String'];
  imageUrl: Scalars['String'];
  ticker: Scalars['String'];
  condition: Condition;
  authenticity: Scalars['Float'];
  switches: Array<Scalars['String']>;
  createdAt: Scalars['String'];
  updatedAt: Scalars['String'];
};

export type KeebFieldError = {
  __typename?: 'KeebFieldError';
  field: Scalars['String'];
  message: Scalars['String'];
};

export type KeebOptions = {
  title: Scalars['String'];
  imageUrl: Scalars['String'];
  ticker: Scalars['String'];
  condition: Condition;
  authenticity: Scalars['Float'];
  switches: Array<Scalars['String']>;
};

export type KeebResponse = {
  __typename?: 'KeebResponse';
  errors?: Maybe<Array<KeebFieldError>>;
  keebs?: Maybe<Array<Keeb>>;
  keeb?: Maybe<Keeb>;
};

export type Mutation = {
  __typename?: 'Mutation';
  changePassword: UserResponse;
  forgotPassword: Scalars['Boolean'];
  register: UserResponse;
  login: UserResponse;
  logout: Scalars['Boolean'];
  updateUserDetails: UserResponse;
  createKeeb: KeebResponse;
  updateKeeb: KeebResponse;
  deleteKeeb: KeebResponse;
  createSale: SaleResponse;
  deleteSale: SaleResponse;
  createAsk: AskResponse;
  deleteAsk: AskResponse;
  createBid: BidResponse;
  deleteBid: BidResponse;
};

export type MutationChangePasswordArgs = {
  newPassword: Scalars['String'];
  token: Scalars['String'];
};

export type MutationForgotPasswordArgs = {
  email: Scalars['String'];
};

export type MutationRegisterArgs = {
  options: UsernamePasswordInput;
};

export type MutationLoginArgs = {
  password: Scalars['String'];
  usernameOrEmail: Scalars['String'];
};

export type MutationUpdateUserDetailsArgs = {
  options: UserDetailsInput;
};

export type MutationCreateKeebArgs = {
  options: KeebOptions;
};

export type MutationUpdateKeebArgs = {
  id: Scalars['Float'];
  updateOptions: UpdateKeebOptions;
};

export type MutationDeleteKeebArgs = {
  id: Scalars['Float'];
};

export type MutationCreateSaleArgs = {
  options: SaleInput;
};

export type MutationDeleteSaleArgs = {
  saleId: Scalars['Float'];
};

export type MutationCreateAskArgs = {
  options: AskInput;
};

export type MutationDeleteAskArgs = {
  askId: Scalars['Float'];
};

export type MutationCreateBidArgs = {
  options: BidInput;
};

export type MutationDeleteBidArgs = {
  bidId: Scalars['Float'];
};

export type Query = {
  __typename?: 'Query';
  me?: Maybe<User>;
  keeb?: Maybe<Keeb>;
  keebs?: Maybe<Array<Keeb>>;
  keebsWithPagination?: Maybe<Array<Keeb>>;
  sales?: Maybe<Array<Sale>>;
  lastSale?: Maybe<Sale>;
  sale?: Maybe<Sale>;
  ask?: Maybe<Ask>;
  lowestAsk?: Maybe<Ask>;
  asks?: Maybe<Array<Ask>>;
  bids?: Maybe<Array<Bid>>;
  bid?: Maybe<Bid>;
  highestBid?: Maybe<Bid>;
};

export type QueryKeebArgs = {
  keebId: Scalars['Float'];
};

export type QueryKeebsWithPaginationArgs = {
  offset: Scalars['Float'];
  limit: Scalars['Float'];
};

export type QuerySalesArgs = {
  keebId: Scalars['Float'];
};

export type QueryLastSaleArgs = {
  keebId: Scalars['Float'];
};

export type QuerySaleArgs = {
  saleId: Scalars['Float'];
};

export type QueryAskArgs = {
  askId: Scalars['Float'];
};

export type QueryLowestAskArgs = {
  keebId: Scalars['Float'];
};

export type QueryAsksArgs = {
  keebId: Scalars['Float'];
};

export type QueryBidsArgs = {
  keebId: Scalars['Float'];
};

export type QueryBidArgs = {
  bidId: Scalars['Float'];
};

export type QueryHighestBidArgs = {
  keebId: Scalars['Float'];
};

export type Sale = {
  __typename?: 'Sale';
  saleId: Scalars['Float'];
  salePrice: Scalars['Float'];
  bidId: Scalars['Float'];
  askId: Scalars['Float'];
  keebId: Scalars['Float'];
  createdAt: Scalars['String'];
  updatedAt: Scalars['String'];
};

export type User = {
  __typename?: 'User';
  id: Scalars['Float'];
  profilePhotoUrl?: Maybe<Scalars['String']>;
  bio?: Maybe<Scalars['String']>;
  username: Scalars['String'];
  email: Scalars['String'];
  createdAt: Scalars['String'];
  updatedAt: Scalars['String'];
};

export type UserDetailsInput = {
  email: Scalars['String'];
  username: Scalars['String'];
  bio: Scalars['String'];
  profilePhotoUrl: Scalars['String'];
};

export type UserResponse = {
  __typename?: 'UserResponse';
  errors?: Maybe<Array<FieldError>>;
  user?: Maybe<User>;
};

export type UsernamePasswordInput = {
  email: Scalars['String'];
  username: Scalars['String'];
  password: Scalars['String'];
  bio?: Maybe<Scalars['String']>;
  profilePhotoUrl?: Maybe<Scalars['String']>;
};

export type AskFieldError = {
  __typename?: 'askFieldError';
  field: Scalars['String'];
  message: Scalars['String'];
};

export type AskInput = {
  askPrice: Scalars['Float'];
  userId: Scalars['Float'];
  keebId: Scalars['Float'];
  title: Scalars['String'];
  ticker: Scalars['String'];
};

export type AskResponse = {
  __typename?: 'askResponse';
  errors?: Maybe<Array<AskFieldError>>;
  ask?: Maybe<Ask>;
};

export type BidFieldError = {
  __typename?: 'bidFieldError';
  field: Scalars['String'];
  message: Scalars['String'];
};

export type BidInput = {
  bidPrice: Scalars['Float'];
  userId: Scalars['Float'];
  keebId: Scalars['Float'];
  title: Scalars['String'];
  ticker: Scalars['String'];
};

export type BidResponse = {
  __typename?: 'bidResponse';
  errors?: Maybe<Array<BidFieldError>>;
  bid?: Maybe<Bid>;
};

/** Enum for the condition of the keeb */
export enum Condition {
  New = 'New',
  Used = 'Used',
}

export type SaleFieldError = {
  __typename?: 'saleFieldError';
  field: Scalars['String'];
  message: Scalars['String'];
};

export type SaleInput = {
  salePrice: Scalars['Float'];
  bidId: Scalars['Float'];
  askId: Scalars['Float'];
  keebId: Scalars['Float'];
};

export type SaleResponse = {
  __typename?: 'saleResponse';
  errors?: Maybe<Array<SaleFieldError>>;
  sale?: Maybe<Sale>;
};

export type UpdateKeebOptions = {
  title?: Maybe<Scalars['String']>;
  ticker?: Maybe<Scalars['String']>;
  condition?: Maybe<Condition>;
  authenticity?: Maybe<Scalars['Float']>;
  switches?: Maybe<Array<Scalars['String']>>;
};

export type RegularErrorFragment = {
  __typename?: 'FieldError';
  field: string;
  message: string;
};

export type RegularUserFragment = {
  __typename?: 'User';
  id: number;
  username: string;
};

export type RegularUserResponseFragment = {
  __typename?: 'UserResponse';
  errors?: Maybe<
    Array<{ __typename?: 'FieldError'; field: string; message: string }>
  >;
  user?: Maybe<{ __typename?: 'User'; id: number; username: string }>;
};

export type AddAskMutationVariables = Exact<{
  options: AskInput;
}>;

export type AddAskMutation = {
  __typename?: 'Mutation';
  createAsk: {
    __typename?: 'askResponse';
    errors?: Maybe<
      Array<{ __typename?: 'askFieldError'; field: string; message: string }>
    >;
    ask?: Maybe<{ __typename?: 'Ask'; askId: number }>;
  };
};

export type AddBidMutationVariables = Exact<{
  options: BidInput;
}>;

export type AddBidMutation = {
  __typename?: 'Mutation';
  createBid: {
    __typename?: 'bidResponse';
    errors?: Maybe<
      Array<{ __typename?: 'bidFieldError'; field: string; message: string }>
    >;
    bid?: Maybe<{ __typename?: 'Bid'; bidId: number }>;
  };
};

export type CreateKeebMutationVariables = Exact<{
  options: KeebOptions;
}>;

export type CreateKeebMutation = {
  __typename?: 'Mutation';
  createKeeb: {
    __typename?: 'KeebResponse';
    keeb?: Maybe<{
      __typename?: 'Keeb';
      id: number;
      title: string;
      ticker: string;
      imageUrl: string;
      condition: Condition;
      authenticity: number;
      switches: Array<string>;
      createdAt: string;
      updatedAt: string;
    }>;
    errors?: Maybe<
      Array<{ __typename?: 'KeebFieldError'; field: string; message: string }>
    >;
  };
};

export type DeleteKeebMutationVariables = Exact<{
  id: Scalars['Float'];
}>;

export type DeleteKeebMutation = {
  __typename?: 'Mutation';
  deleteKeeb: {
    __typename?: 'KeebResponse';
    errors?: Maybe<
      Array<{ __typename?: 'KeebFieldError'; field: string; message: string }>
    >;
    keebs?: Maybe<
      Array<{ __typename?: 'Keeb'; id: number; title: string; ticker: string }>
    >;
  };
};

export type LoginMutationVariables = Exact<{
  usernameOrEmail: Scalars['String'];
  password: Scalars['String'];
}>;

export type LoginMutation = {
  __typename?: 'Mutation';
  login: {
    __typename?: 'UserResponse';
    errors?: Maybe<
      Array<{ __typename?: 'FieldError'; field: string; message: string }>
    >;
    user?: Maybe<{ __typename?: 'User'; id: number; username: string }>;
  };
};

export type LogoutMutationVariables = Exact<{ [key: string]: never }>;

export type LogoutMutation = { __typename?: 'Mutation'; logout: boolean };

export type RegisterMutationVariables = Exact<{
  options: UsernamePasswordInput;
}>;

export type RegisterMutation = {
  __typename?: 'Mutation';
  register: {
    __typename?: 'UserResponse';
    errors?: Maybe<
      Array<{ __typename?: 'FieldError'; field: string; message: string }>
    >;
    user?: Maybe<{ __typename?: 'User'; id: number; username: string }>;
  };
};

export type UpdateKeebMutationVariables = Exact<{
  updateOptions: UpdateKeebOptions;
  id: Scalars['Float'];
}>;

export type UpdateKeebMutation = {
  __typename?: 'Mutation';
  updateKeeb: {
    __typename?: 'KeebResponse';
    keebs?: Maybe<
      Array<{
        __typename?: 'Keeb';
        title: string;
        ticker: string;
        condition: Condition;
        authenticity: number;
      }>
    >;
  };
};

export type KeebsQueryVariables = Exact<{ [key: string]: never }>;

export type KeebsQuery = {
  __typename?: 'Query';
  keebs?: Maybe<
    Array<{
      __typename?: 'Keeb';
      id: number;
      title: string;
      ticker: string;
      condition: Condition;
      imageUrl: string;
      authenticity: number;
      switches: Array<string>;
      createdAt: string;
      updatedAt: string;
    }>
  >;
};

export type AsksQueryVariables = Exact<{
  keebId: Scalars['Float'];
}>;

export type AsksQuery = {
  __typename?: 'Query';
  asks?: Maybe<
    Array<{
      __typename?: 'Ask';
      askId: number;
      askPrice: number;
      userId: number;
      keebId: number;
      title: string;
      ticker: string;
      createdAt: string;
      updatedAt: string;
    }>
  >;
};

export type BidsQueryVariables = Exact<{
  keebId: Scalars['Float'];
}>;

export type BidsQuery = {
  __typename?: 'Query';
  bids?: Maybe<
    Array<{
      __typename?: 'Bid';
      bidId: number;
      bidPrice: number;
      keebId: number;
      userId: number;
      title: string;
      ticker: string;
      createdAt: string;
      updatedAt: string;
    }>
  >;
};

export type HighestBidQueryVariables = Exact<{
  keebId: Scalars['Float'];
}>;

export type HighestBidQuery = {
  __typename?: 'Query';
  highestBid?: Maybe<{
    __typename?: 'Bid';
    bidId: number;
    bidPrice: number;
    userId: number;
    keebId: number;
    title: string;
    ticker: string;
    createdAt: string;
    updatedAt: string;
  }>;
};

export type KeebQueryVariables = Exact<{
  id: Scalars['Float'];
}>;

export type KeebQuery = {
  __typename?: 'Query';
  keeb?: Maybe<{
    __typename?: 'Keeb';
    id: number;
    title: string;
    imageUrl: string;
    ticker: string;
    condition: Condition;
    authenticity: number;
    switches: Array<string>;
    createdAt: string;
    updatedAt: string;
  }>;
};

export type LastSaleQueryVariables = Exact<{
  keebId: Scalars['Float'];
}>;

export type LastSaleQuery = {
  __typename?: 'Query';
  lastSale?: Maybe<{
    __typename?: 'Sale';
    saleId: number;
    salePrice: number;
    bidId: number;
    askId: number;
    keebId: number;
    createdAt: string;
    updatedAt: string;
  }>;
};

export type LowestAskQueryVariables = Exact<{
  keebId: Scalars['Float'];
}>;

export type LowestAskQuery = {
  __typename?: 'Query';
  lowestAsk?: Maybe<{
    __typename?: 'Ask';
    askId: number;
    askPrice: number;
    userId: number;
    keebId: number;
    title: string;
    ticker: string;
    createdAt: string;
    updatedAt: string;
  }>;
};

export type MeQueryVariables = Exact<{ [key: string]: never }>;

export type MeQuery = {
  __typename?: 'Query';
  me?: Maybe<{ __typename?: 'User'; id: number; username: string }>;
};

export type PaginatedKeebsQueryVariables = Exact<{
  limit: Scalars['Float'];
  offset: Scalars['Float'];
}>;

export type PaginatedKeebsQuery = {
  __typename?: 'Query';
  keebsWithPagination?: Maybe<
    Array<{
      __typename?: 'Keeb';
      id: number;
      title: string;
      ticker: string;
      imageUrl: string;
      condition: Condition;
      authenticity: number;
      switches: Array<string>;
      createdAt: string;
      updatedAt: string;
    }>
  >;
};

export type SalesQueryVariables = Exact<{
  keebId: Scalars['Float'];
}>;

export type SalesQuery = {
  __typename?: 'Query';
  sales?: Maybe<
    Array<{
      __typename?: 'Sale';
      saleId: number;
      salePrice: number;
      bidId: number;
      askId: number;
      keebId: number;
      createdAt: string;
      updatedAt: string;
    }>
  >;
};

export const RegularErrorFragmentDoc = gql`
  fragment RegularError on FieldError {
    field
    message
  }
`;
export const RegularUserFragmentDoc = gql`
  fragment RegularUser on User {
    id
    username
  }
`;
export const RegularUserResponseFragmentDoc = gql`
  fragment RegularUserResponse on UserResponse {
    errors {
      ...RegularError
    }
    user {
      ...RegularUser
    }
  }
  ${RegularErrorFragmentDoc}
  ${RegularUserFragmentDoc}
`;
export const AddAskDocument = gql`
  mutation addAsk($options: askInput!) {
    createAsk(options: $options) {
      errors {
        field
        message
      }
      ask {
        askId
      }
    }
  }
`;
export type AddAskMutationFn = Apollo.MutationFunction<
  AddAskMutation,
  AddAskMutationVariables
>;

/**
 * __useAddAskMutation__
 *
 * To run a mutation, you first call `useAddAskMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useAddAskMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [addAskMutation, { data, loading, error }] = useAddAskMutation({
 *   variables: {
 *      options: // value for 'options'
 *   },
 * });
 */
export function useAddAskMutation(
  baseOptions?: Apollo.MutationHookOptions<
    AddAskMutation,
    AddAskMutationVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useMutation<AddAskMutation, AddAskMutationVariables>(
    AddAskDocument,
    options
  );
}
export type AddAskMutationHookResult = ReturnType<typeof useAddAskMutation>;
export type AddAskMutationResult = Apollo.MutationResult<AddAskMutation>;
export type AddAskMutationOptions = Apollo.BaseMutationOptions<
  AddAskMutation,
  AddAskMutationVariables
>;
export const AddBidDocument = gql`
  mutation addBid($options: bidInput!) {
    createBid(options: $options) {
      errors {
        field
        message
      }
      bid {
        bidId
      }
    }
  }
`;
export type AddBidMutationFn = Apollo.MutationFunction<
  AddBidMutation,
  AddBidMutationVariables
>;

/**
 * __useAddBidMutation__
 *
 * To run a mutation, you first call `useAddBidMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useAddBidMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [addBidMutation, { data, loading, error }] = useAddBidMutation({
 *   variables: {
 *      options: // value for 'options'
 *   },
 * });
 */
export function useAddBidMutation(
  baseOptions?: Apollo.MutationHookOptions<
    AddBidMutation,
    AddBidMutationVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useMutation<AddBidMutation, AddBidMutationVariables>(
    AddBidDocument,
    options
  );
}
export type AddBidMutationHookResult = ReturnType<typeof useAddBidMutation>;
export type AddBidMutationResult = Apollo.MutationResult<AddBidMutation>;
export type AddBidMutationOptions = Apollo.BaseMutationOptions<
  AddBidMutation,
  AddBidMutationVariables
>;
export const CreateKeebDocument = gql`
  mutation createKeeb($options: KeebOptions!) {
    createKeeb(options: $options) {
      keeb {
        id
        title
        ticker
        imageUrl
        condition
        authenticity
        switches
        createdAt
        updatedAt
      }
      errors {
        field
        message
      }
    }
  }
`;
export type CreateKeebMutationFn = Apollo.MutationFunction<
  CreateKeebMutation,
  CreateKeebMutationVariables
>;

/**
 * __useCreateKeebMutation__
 *
 * To run a mutation, you first call `useCreateKeebMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreateKeebMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createKeebMutation, { data, loading, error }] = useCreateKeebMutation({
 *   variables: {
 *      options: // value for 'options'
 *   },
 * });
 */
export function useCreateKeebMutation(
  baseOptions?: Apollo.MutationHookOptions<
    CreateKeebMutation,
    CreateKeebMutationVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useMutation<CreateKeebMutation, CreateKeebMutationVariables>(
    CreateKeebDocument,
    options
  );
}
export type CreateKeebMutationHookResult = ReturnType<
  typeof useCreateKeebMutation
>;
export type CreateKeebMutationResult =
  Apollo.MutationResult<CreateKeebMutation>;
export type CreateKeebMutationOptions = Apollo.BaseMutationOptions<
  CreateKeebMutation,
  CreateKeebMutationVariables
>;
export const DeleteKeebDocument = gql`
  mutation deleteKeeb($id: Float!) {
    deleteKeeb(id: $id) {
      errors {
        field
        message
      }
      keebs {
        id
        title
        ticker
      }
    }
  }
`;
export type DeleteKeebMutationFn = Apollo.MutationFunction<
  DeleteKeebMutation,
  DeleteKeebMutationVariables
>;

/**
 * __useDeleteKeebMutation__
 *
 * To run a mutation, you first call `useDeleteKeebMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useDeleteKeebMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [deleteKeebMutation, { data, loading, error }] = useDeleteKeebMutation({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function useDeleteKeebMutation(
  baseOptions?: Apollo.MutationHookOptions<
    DeleteKeebMutation,
    DeleteKeebMutationVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useMutation<DeleteKeebMutation, DeleteKeebMutationVariables>(
    DeleteKeebDocument,
    options
  );
}
export type DeleteKeebMutationHookResult = ReturnType<
  typeof useDeleteKeebMutation
>;
export type DeleteKeebMutationResult =
  Apollo.MutationResult<DeleteKeebMutation>;
export type DeleteKeebMutationOptions = Apollo.BaseMutationOptions<
  DeleteKeebMutation,
  DeleteKeebMutationVariables
>;
export const LoginDocument = gql`
  mutation Login($usernameOrEmail: String!, $password: String!) {
    login(usernameOrEmail: $usernameOrEmail, password: $password) {
      ...RegularUserResponse
    }
  }
  ${RegularUserResponseFragmentDoc}
`;
export type LoginMutationFn = Apollo.MutationFunction<
  LoginMutation,
  LoginMutationVariables
>;

/**
 * __useLoginMutation__
 *
 * To run a mutation, you first call `useLoginMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useLoginMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [loginMutation, { data, loading, error }] = useLoginMutation({
 *   variables: {
 *      usernameOrEmail: // value for 'usernameOrEmail'
 *      password: // value for 'password'
 *   },
 * });
 */
export function useLoginMutation(
  baseOptions?: Apollo.MutationHookOptions<
    LoginMutation,
    LoginMutationVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useMutation<LoginMutation, LoginMutationVariables>(
    LoginDocument,
    options
  );
}
export type LoginMutationHookResult = ReturnType<typeof useLoginMutation>;
export type LoginMutationResult = Apollo.MutationResult<LoginMutation>;
export type LoginMutationOptions = Apollo.BaseMutationOptions<
  LoginMutation,
  LoginMutationVariables
>;
export const LogoutDocument = gql`
  mutation Logout {
    logout
  }
`;
export type LogoutMutationFn = Apollo.MutationFunction<
  LogoutMutation,
  LogoutMutationVariables
>;

/**
 * __useLogoutMutation__
 *
 * To run a mutation, you first call `useLogoutMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useLogoutMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [logoutMutation, { data, loading, error }] = useLogoutMutation({
 *   variables: {
 *   },
 * });
 */
export function useLogoutMutation(
  baseOptions?: Apollo.MutationHookOptions<
    LogoutMutation,
    LogoutMutationVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useMutation<LogoutMutation, LogoutMutationVariables>(
    LogoutDocument,
    options
  );
}
export type LogoutMutationHookResult = ReturnType<typeof useLogoutMutation>;
export type LogoutMutationResult = Apollo.MutationResult<LogoutMutation>;
export type LogoutMutationOptions = Apollo.BaseMutationOptions<
  LogoutMutation,
  LogoutMutationVariables
>;
export const RegisterDocument = gql`
  mutation Register($options: UsernamePasswordInput!) {
    register(options: $options) {
      ...RegularUserResponse
    }
  }
  ${RegularUserResponseFragmentDoc}
`;
export type RegisterMutationFn = Apollo.MutationFunction<
  RegisterMutation,
  RegisterMutationVariables
>;

/**
 * __useRegisterMutation__
 *
 * To run a mutation, you first call `useRegisterMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useRegisterMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [registerMutation, { data, loading, error }] = useRegisterMutation({
 *   variables: {
 *      options: // value for 'options'
 *   },
 * });
 */
export function useRegisterMutation(
  baseOptions?: Apollo.MutationHookOptions<
    RegisterMutation,
    RegisterMutationVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useMutation<RegisterMutation, RegisterMutationVariables>(
    RegisterDocument,
    options
  );
}
export type RegisterMutationHookResult = ReturnType<typeof useRegisterMutation>;
export type RegisterMutationResult = Apollo.MutationResult<RegisterMutation>;
export type RegisterMutationOptions = Apollo.BaseMutationOptions<
  RegisterMutation,
  RegisterMutationVariables
>;
export const UpdateKeebDocument = gql`
  mutation updateKeeb($updateOptions: updateKeebOptions!, $id: Float!) {
    updateKeeb(updateOptions: $updateOptions, id: $id) {
      keebs {
        title
        ticker
        condition
        authenticity
      }
    }
  }
`;
export type UpdateKeebMutationFn = Apollo.MutationFunction<
  UpdateKeebMutation,
  UpdateKeebMutationVariables
>;

/**
 * __useUpdateKeebMutation__
 *
 * To run a mutation, you first call `useUpdateKeebMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUpdateKeebMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [updateKeebMutation, { data, loading, error }] = useUpdateKeebMutation({
 *   variables: {
 *      updateOptions: // value for 'updateOptions'
 *      id: // value for 'id'
 *   },
 * });
 */
export function useUpdateKeebMutation(
  baseOptions?: Apollo.MutationHookOptions<
    UpdateKeebMutation,
    UpdateKeebMutationVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useMutation<UpdateKeebMutation, UpdateKeebMutationVariables>(
    UpdateKeebDocument,
    options
  );
}
export type UpdateKeebMutationHookResult = ReturnType<
  typeof useUpdateKeebMutation
>;
export type UpdateKeebMutationResult =
  Apollo.MutationResult<UpdateKeebMutation>;
export type UpdateKeebMutationOptions = Apollo.BaseMutationOptions<
  UpdateKeebMutation,
  UpdateKeebMutationVariables
>;
export const KeebsDocument = gql`
  query keebs {
    keebs {
      id
      title
      ticker
      condition
      imageUrl
      authenticity
      switches
      createdAt
      updatedAt
    }
  }
`;

/**
 * __useKeebsQuery__
 *
 * To run a query within a React component, call `useKeebsQuery` and pass it any options that fit your needs.
 * When your component renders, `useKeebsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useKeebsQuery({
 *   variables: {
 *   },
 * });
 */
export function useKeebsQuery(
  baseOptions?: Apollo.QueryHookOptions<KeebsQuery, KeebsQueryVariables>
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useQuery<KeebsQuery, KeebsQueryVariables>(
    KeebsDocument,
    options
  );
}
export function useKeebsLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<KeebsQuery, KeebsQueryVariables>
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useLazyQuery<KeebsQuery, KeebsQueryVariables>(
    KeebsDocument,
    options
  );
}
export type KeebsQueryHookResult = ReturnType<typeof useKeebsQuery>;
export type KeebsLazyQueryHookResult = ReturnType<typeof useKeebsLazyQuery>;
export type KeebsQueryResult = Apollo.QueryResult<
  KeebsQuery,
  KeebsQueryVariables
>;
export const AsksDocument = gql`
  query asks($keebId: Float!) {
    asks(keebId: $keebId) {
      askId
      askPrice
      userId
      keebId
      title
      ticker
      createdAt
      updatedAt
    }
  }
`;

/**
 * __useAsksQuery__
 *
 * To run a query within a React component, call `useAsksQuery` and pass it any options that fit your needs.
 * When your component renders, `useAsksQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useAsksQuery({
 *   variables: {
 *      keebId: // value for 'keebId'
 *   },
 * });
 */
export function useAsksQuery(
  baseOptions: Apollo.QueryHookOptions<AsksQuery, AsksQueryVariables>
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useQuery<AsksQuery, AsksQueryVariables>(AsksDocument, options);
}
export function useAsksLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<AsksQuery, AsksQueryVariables>
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useLazyQuery<AsksQuery, AsksQueryVariables>(
    AsksDocument,
    options
  );
}
export type AsksQueryHookResult = ReturnType<typeof useAsksQuery>;
export type AsksLazyQueryHookResult = ReturnType<typeof useAsksLazyQuery>;
export type AsksQueryResult = Apollo.QueryResult<AsksQuery, AsksQueryVariables>;
export const BidsDocument = gql`
  query bids($keebId: Float!) {
    bids(keebId: $keebId) {
      bidId
      bidPrice
      keebId
      userId
      title
      ticker
      createdAt
      updatedAt
    }
  }
`;

/**
 * __useBidsQuery__
 *
 * To run a query within a React component, call `useBidsQuery` and pass it any options that fit your needs.
 * When your component renders, `useBidsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useBidsQuery({
 *   variables: {
 *      keebId: // value for 'keebId'
 *   },
 * });
 */
export function useBidsQuery(
  baseOptions: Apollo.QueryHookOptions<BidsQuery, BidsQueryVariables>
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useQuery<BidsQuery, BidsQueryVariables>(BidsDocument, options);
}
export function useBidsLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<BidsQuery, BidsQueryVariables>
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useLazyQuery<BidsQuery, BidsQueryVariables>(
    BidsDocument,
    options
  );
}
export type BidsQueryHookResult = ReturnType<typeof useBidsQuery>;
export type BidsLazyQueryHookResult = ReturnType<typeof useBidsLazyQuery>;
export type BidsQueryResult = Apollo.QueryResult<BidsQuery, BidsQueryVariables>;
export const HighestBidDocument = gql`
  query highestBid($keebId: Float!) {
    highestBid(keebId: $keebId) {
      bidId
      bidPrice
      userId
      keebId
      title
      ticker
      createdAt
      updatedAt
    }
  }
`;

/**
 * __useHighestBidQuery__
 *
 * To run a query within a React component, call `useHighestBidQuery` and pass it any options that fit your needs.
 * When your component renders, `useHighestBidQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useHighestBidQuery({
 *   variables: {
 *      keebId: // value for 'keebId'
 *   },
 * });
 */
export function useHighestBidQuery(
  baseOptions: Apollo.QueryHookOptions<
    HighestBidQuery,
    HighestBidQueryVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useQuery<HighestBidQuery, HighestBidQueryVariables>(
    HighestBidDocument,
    options
  );
}
export function useHighestBidLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<
    HighestBidQuery,
    HighestBidQueryVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useLazyQuery<HighestBidQuery, HighestBidQueryVariables>(
    HighestBidDocument,
    options
  );
}
export type HighestBidQueryHookResult = ReturnType<typeof useHighestBidQuery>;
export type HighestBidLazyQueryHookResult = ReturnType<
  typeof useHighestBidLazyQuery
>;
export type HighestBidQueryResult = Apollo.QueryResult<
  HighestBidQuery,
  HighestBidQueryVariables
>;
export const KeebDocument = gql`
  query keeb($id: Float!) {
    keeb(keebId: $id) {
      id
      title
      imageUrl
      ticker
      condition
      authenticity
      switches
      createdAt
      updatedAt
    }
  }
`;

/**
 * __useKeebQuery__
 *
 * To run a query within a React component, call `useKeebQuery` and pass it any options that fit your needs.
 * When your component renders, `useKeebQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useKeebQuery({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function useKeebQuery(
  baseOptions: Apollo.QueryHookOptions<KeebQuery, KeebQueryVariables>
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useQuery<KeebQuery, KeebQueryVariables>(KeebDocument, options);
}
export function useKeebLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<KeebQuery, KeebQueryVariables>
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useLazyQuery<KeebQuery, KeebQueryVariables>(
    KeebDocument,
    options
  );
}
export type KeebQueryHookResult = ReturnType<typeof useKeebQuery>;
export type KeebLazyQueryHookResult = ReturnType<typeof useKeebLazyQuery>;
export type KeebQueryResult = Apollo.QueryResult<KeebQuery, KeebQueryVariables>;
export const LastSaleDocument = gql`
  query lastSale($keebId: Float!) {
    lastSale(keebId: $keebId) {
      saleId
      salePrice
      bidId
      askId
      keebId
      createdAt
      updatedAt
    }
  }
`;

/**
 * __useLastSaleQuery__
 *
 * To run a query within a React component, call `useLastSaleQuery` and pass it any options that fit your needs.
 * When your component renders, `useLastSaleQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useLastSaleQuery({
 *   variables: {
 *      keebId: // value for 'keebId'
 *   },
 * });
 */
export function useLastSaleQuery(
  baseOptions: Apollo.QueryHookOptions<LastSaleQuery, LastSaleQueryVariables>
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useQuery<LastSaleQuery, LastSaleQueryVariables>(
    LastSaleDocument,
    options
  );
}
export function useLastSaleLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<
    LastSaleQuery,
    LastSaleQueryVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useLazyQuery<LastSaleQuery, LastSaleQueryVariables>(
    LastSaleDocument,
    options
  );
}
export type LastSaleQueryHookResult = ReturnType<typeof useLastSaleQuery>;
export type LastSaleLazyQueryHookResult = ReturnType<
  typeof useLastSaleLazyQuery
>;
export type LastSaleQueryResult = Apollo.QueryResult<
  LastSaleQuery,
  LastSaleQueryVariables
>;
export const LowestAskDocument = gql`
  query lowestAsk($keebId: Float!) {
    lowestAsk(keebId: $keebId) {
      askId
      askPrice
      userId
      keebId
      title
      ticker
      createdAt
      updatedAt
    }
  }
`;

/**
 * __useLowestAskQuery__
 *
 * To run a query within a React component, call `useLowestAskQuery` and pass it any options that fit your needs.
 * When your component renders, `useLowestAskQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useLowestAskQuery({
 *   variables: {
 *      keebId: // value for 'keebId'
 *   },
 * });
 */
export function useLowestAskQuery(
  baseOptions: Apollo.QueryHookOptions<LowestAskQuery, LowestAskQueryVariables>
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useQuery<LowestAskQuery, LowestAskQueryVariables>(
    LowestAskDocument,
    options
  );
}
export function useLowestAskLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<
    LowestAskQuery,
    LowestAskQueryVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useLazyQuery<LowestAskQuery, LowestAskQueryVariables>(
    LowestAskDocument,
    options
  );
}
export type LowestAskQueryHookResult = ReturnType<typeof useLowestAskQuery>;
export type LowestAskLazyQueryHookResult = ReturnType<
  typeof useLowestAskLazyQuery
>;
export type LowestAskQueryResult = Apollo.QueryResult<
  LowestAskQuery,
  LowestAskQueryVariables
>;
export const MeDocument = gql`
  query Me {
    me {
      ...RegularUser
    }
  }
  ${RegularUserFragmentDoc}
`;

/**
 * __useMeQuery__
 *
 * To run a query within a React component, call `useMeQuery` and pass it any options that fit your needs.
 * When your component renders, `useMeQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useMeQuery({
 *   variables: {
 *   },
 * });
 */
export function useMeQuery(
  baseOptions?: Apollo.QueryHookOptions<MeQuery, MeQueryVariables>
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useQuery<MeQuery, MeQueryVariables>(MeDocument, options);
}
export function useMeLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<MeQuery, MeQueryVariables>
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useLazyQuery<MeQuery, MeQueryVariables>(MeDocument, options);
}
export type MeQueryHookResult = ReturnType<typeof useMeQuery>;
export type MeLazyQueryHookResult = ReturnType<typeof useMeLazyQuery>;
export type MeQueryResult = Apollo.QueryResult<MeQuery, MeQueryVariables>;
export const PaginatedKeebsDocument = gql`
  query paginatedKeebs($limit: Float!, $offset: Float!) {
    keebsWithPagination(limit: $limit, offset: $offset) {
      id
      title
      ticker
      imageUrl
      condition
      authenticity
      switches
      createdAt
      updatedAt
    }
  }
`;

/**
 * __usePaginatedKeebsQuery__
 *
 * To run a query within a React component, call `usePaginatedKeebsQuery` and pass it any options that fit your needs.
 * When your component renders, `usePaginatedKeebsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = usePaginatedKeebsQuery({
 *   variables: {
 *      limit: // value for 'limit'
 *      offset: // value for 'offset'
 *   },
 * });
 */
export function usePaginatedKeebsQuery(
  baseOptions: Apollo.QueryHookOptions<
    PaginatedKeebsQuery,
    PaginatedKeebsQueryVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useQuery<PaginatedKeebsQuery, PaginatedKeebsQueryVariables>(
    PaginatedKeebsDocument,
    options
  );
}
export function usePaginatedKeebsLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<
    PaginatedKeebsQuery,
    PaginatedKeebsQueryVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useLazyQuery<PaginatedKeebsQuery, PaginatedKeebsQueryVariables>(
    PaginatedKeebsDocument,
    options
  );
}
export type PaginatedKeebsQueryHookResult = ReturnType<
  typeof usePaginatedKeebsQuery
>;
export type PaginatedKeebsLazyQueryHookResult = ReturnType<
  typeof usePaginatedKeebsLazyQuery
>;
export type PaginatedKeebsQueryResult = Apollo.QueryResult<
  PaginatedKeebsQuery,
  PaginatedKeebsQueryVariables
>;
export const SalesDocument = gql`
  query sales($keebId: Float!) {
    sales(keebId: $keebId) {
      saleId
      salePrice
      bidId
      askId
      keebId
      createdAt
      updatedAt
    }
  }
`;

/**
 * __useSalesQuery__
 *
 * To run a query within a React component, call `useSalesQuery` and pass it any options that fit your needs.
 * When your component renders, `useSalesQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useSalesQuery({
 *   variables: {
 *      keebId: // value for 'keebId'
 *   },
 * });
 */
export function useSalesQuery(
  baseOptions: Apollo.QueryHookOptions<SalesQuery, SalesQueryVariables>
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useQuery<SalesQuery, SalesQueryVariables>(
    SalesDocument,
    options
  );
}
export function useSalesLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<SalesQuery, SalesQueryVariables>
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useLazyQuery<SalesQuery, SalesQueryVariables>(
    SalesDocument,
    options
  );
}
export type SalesQueryHookResult = ReturnType<typeof useSalesQuery>;
export type SalesLazyQueryHookResult = ReturnType<typeof useSalesLazyQuery>;
export type SalesQueryResult = Apollo.QueryResult<
  SalesQuery,
  SalesQueryVariables
>;
