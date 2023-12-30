import { z } from 'zod';
import type { Prisma } from '@prisma/client';

/////////////////////////////////////////
// HELPER FUNCTIONS
/////////////////////////////////////////


/////////////////////////////////////////
// ENUMS
/////////////////////////////////////////

export const TransactionIsolationLevelSchema = z.enum(['Serializable']);

export const ResourceScalarFieldEnumSchema = z.enum(['id','name','category','address','latitude','longitude','postalCode','email','contactNumber','website','inactive']);

export const VerificationTokenScalarFieldEnumSchema = z.enum(['identifier','token','createdAt','challengeTs']);

export const CommentScalarFieldEnumSchema = z.enum(['id','resourceId','content','contentHtml','author','createdAt']);

export const SortOrderSchema = z.enum(['asc','desc']);

export const QueryModeSchema = z.enum(['default','insensitive']);

export const NullsOrderSchema = z.enum(['first','last']);
/////////////////////////////////////////
// MODELS
/////////////////////////////////////////

/////////////////////////////////////////
// RESOURCE SCHEMA
/////////////////////////////////////////

export const ResourceSchema = z.object({
  id: z.string().cuid(),
  name: z.string(),
  category: z.string(),
  address: z.string(),
  latitude: z.number(),
  longitude: z.number(),
  postalCode: z.string(),
  email: z.string().nullable(),
  contactNumber: z.string().nullable(),
  website: z.string().nullable(),
  inactive: z.boolean().nullable(),
})

export type Resource = z.infer<typeof ResourceSchema>

/////////////////////////////////////////
// VERIFICATION TOKEN SCHEMA
/////////////////////////////////////////

export const VerificationTokenSchema = z.object({
  identifier: z.string().cuid(),
  token: z.string(),
  createdAt: z.coerce.date(),
  challengeTs: z.string(),
})

export type VerificationToken = z.infer<typeof VerificationTokenSchema>

/////////////////////////////////////////
// COMMENT SCHEMA
/////////////////////////////////////////

export const CommentSchema = z.object({
  id: z.string().cuid(),
  resourceId: z.string(),
  content: z.string(),
  contentHtml: z.string(),
  author: z.string(),
  createdAt: z.coerce.date(),
})

export type Comment = z.infer<typeof CommentSchema>

/////////////////////////////////////////
// SELECT & INCLUDE
/////////////////////////////////////////

// RESOURCE
//------------------------------------------------------

export const ResourceIncludeSchema: z.ZodType<Prisma.ResourceInclude> = z.object({
  comments: z.union([z.boolean(),z.lazy(() => CommentFindManyArgsSchema)]).optional(),
  _count: z.union([z.boolean(),z.lazy(() => ResourceCountOutputTypeArgsSchema)]).optional(),
}).strict()

export const ResourceArgsSchema: z.ZodType<Prisma.ResourceDefaultArgs> = z.object({
  select: z.lazy(() => ResourceSelectSchema).optional(),
  include: z.lazy(() => ResourceIncludeSchema).optional(),
}).strict();

export const ResourceCountOutputTypeArgsSchema: z.ZodType<Prisma.ResourceCountOutputTypeDefaultArgs> = z.object({
  select: z.lazy(() => ResourceCountOutputTypeSelectSchema).nullish(),
}).strict();

export const ResourceCountOutputTypeSelectSchema: z.ZodType<Prisma.ResourceCountOutputTypeSelect> = z.object({
  comments: z.boolean().optional(),
}).strict();

export const ResourceSelectSchema: z.ZodType<Prisma.ResourceSelect> = z.object({
  id: z.boolean().optional(),
  name: z.boolean().optional(),
  category: z.boolean().optional(),
  address: z.boolean().optional(),
  latitude: z.boolean().optional(),
  longitude: z.boolean().optional(),
  postalCode: z.boolean().optional(),
  email: z.boolean().optional(),
  contactNumber: z.boolean().optional(),
  website: z.boolean().optional(),
  inactive: z.boolean().optional(),
  comments: z.union([z.boolean(),z.lazy(() => CommentFindManyArgsSchema)]).optional(),
  _count: z.union([z.boolean(),z.lazy(() => ResourceCountOutputTypeArgsSchema)]).optional(),
}).strict()

// VERIFICATION TOKEN
//------------------------------------------------------

export const VerificationTokenSelectSchema: z.ZodType<Prisma.VerificationTokenSelect> = z.object({
  identifier: z.boolean().optional(),
  token: z.boolean().optional(),
  createdAt: z.boolean().optional(),
  challengeTs: z.boolean().optional(),
}).strict()

// COMMENT
//------------------------------------------------------

export const CommentIncludeSchema: z.ZodType<Prisma.CommentInclude> = z.object({
  resource: z.union([z.boolean(),z.lazy(() => ResourceArgsSchema)]).optional(),
}).strict()

export const CommentArgsSchema: z.ZodType<Prisma.CommentDefaultArgs> = z.object({
  select: z.lazy(() => CommentSelectSchema).optional(),
  include: z.lazy(() => CommentIncludeSchema).optional(),
}).strict();

export const CommentSelectSchema: z.ZodType<Prisma.CommentSelect> = z.object({
  id: z.boolean().optional(),
  resourceId: z.boolean().optional(),
  content: z.boolean().optional(),
  contentHtml: z.boolean().optional(),
  author: z.boolean().optional(),
  createdAt: z.boolean().optional(),
  resource: z.union([z.boolean(),z.lazy(() => ResourceArgsSchema)]).optional(),
}).strict()


/////////////////////////////////////////
// INPUT TYPES
/////////////////////////////////////////

export const ResourceWhereInputSchema: z.ZodType<Prisma.ResourceWhereInput> = z.object({
  AND: z.union([ z.lazy(() => ResourceWhereInputSchema),z.lazy(() => ResourceWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => ResourceWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => ResourceWhereInputSchema),z.lazy(() => ResourceWhereInputSchema).array() ]).optional(),
  id: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  name: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  category: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  address: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  latitude: z.union([ z.lazy(() => FloatFilterSchema),z.number() ]).optional(),
  longitude: z.union([ z.lazy(() => FloatFilterSchema),z.number() ]).optional(),
  postalCode: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  email: z.union([ z.lazy(() => StringNullableFilterSchema),z.string() ]).optional().nullable(),
  contactNumber: z.union([ z.lazy(() => StringNullableFilterSchema),z.string() ]).optional().nullable(),
  website: z.union([ z.lazy(() => StringNullableFilterSchema),z.string() ]).optional().nullable(),
  inactive: z.union([ z.lazy(() => BoolNullableFilterSchema),z.boolean() ]).optional().nullable(),
  comments: z.lazy(() => CommentListRelationFilterSchema).optional()
}).strict();

export const ResourceOrderByWithRelationInputSchema: z.ZodType<Prisma.ResourceOrderByWithRelationInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  name: z.lazy(() => SortOrderSchema).optional(),
  category: z.lazy(() => SortOrderSchema).optional(),
  address: z.lazy(() => SortOrderSchema).optional(),
  latitude: z.lazy(() => SortOrderSchema).optional(),
  longitude: z.lazy(() => SortOrderSchema).optional(),
  postalCode: z.lazy(() => SortOrderSchema).optional(),
  email: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  contactNumber: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  website: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  inactive: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  comments: z.lazy(() => CommentOrderByRelationAggregateInputSchema).optional()
}).strict();

export const ResourceWhereUniqueInputSchema: z.ZodType<Prisma.ResourceWhereUniqueInput> = z.object({
  id: z.string().cuid()
})
.and(z.object({
  id: z.string().cuid().optional(),
  AND: z.union([ z.lazy(() => ResourceWhereInputSchema),z.lazy(() => ResourceWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => ResourceWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => ResourceWhereInputSchema),z.lazy(() => ResourceWhereInputSchema).array() ]).optional(),
  name: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  category: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  address: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  latitude: z.union([ z.lazy(() => FloatFilterSchema),z.number() ]).optional(),
  longitude: z.union([ z.lazy(() => FloatFilterSchema),z.number() ]).optional(),
  postalCode: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  email: z.union([ z.lazy(() => StringNullableFilterSchema),z.string() ]).optional().nullable(),
  contactNumber: z.union([ z.lazy(() => StringNullableFilterSchema),z.string() ]).optional().nullable(),
  website: z.union([ z.lazy(() => StringNullableFilterSchema),z.string() ]).optional().nullable(),
  inactive: z.union([ z.lazy(() => BoolNullableFilterSchema),z.boolean() ]).optional().nullable(),
  comments: z.lazy(() => CommentListRelationFilterSchema).optional()
}).strict());

export const ResourceOrderByWithAggregationInputSchema: z.ZodType<Prisma.ResourceOrderByWithAggregationInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  name: z.lazy(() => SortOrderSchema).optional(),
  category: z.lazy(() => SortOrderSchema).optional(),
  address: z.lazy(() => SortOrderSchema).optional(),
  latitude: z.lazy(() => SortOrderSchema).optional(),
  longitude: z.lazy(() => SortOrderSchema).optional(),
  postalCode: z.lazy(() => SortOrderSchema).optional(),
  email: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  contactNumber: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  website: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  inactive: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  _count: z.lazy(() => ResourceCountOrderByAggregateInputSchema).optional(),
  _avg: z.lazy(() => ResourceAvgOrderByAggregateInputSchema).optional(),
  _max: z.lazy(() => ResourceMaxOrderByAggregateInputSchema).optional(),
  _min: z.lazy(() => ResourceMinOrderByAggregateInputSchema).optional(),
  _sum: z.lazy(() => ResourceSumOrderByAggregateInputSchema).optional()
}).strict();

export const ResourceScalarWhereWithAggregatesInputSchema: z.ZodType<Prisma.ResourceScalarWhereWithAggregatesInput> = z.object({
  AND: z.union([ z.lazy(() => ResourceScalarWhereWithAggregatesInputSchema),z.lazy(() => ResourceScalarWhereWithAggregatesInputSchema).array() ]).optional(),
  OR: z.lazy(() => ResourceScalarWhereWithAggregatesInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => ResourceScalarWhereWithAggregatesInputSchema),z.lazy(() => ResourceScalarWhereWithAggregatesInputSchema).array() ]).optional(),
  id: z.union([ z.lazy(() => StringWithAggregatesFilterSchema),z.string() ]).optional(),
  name: z.union([ z.lazy(() => StringWithAggregatesFilterSchema),z.string() ]).optional(),
  category: z.union([ z.lazy(() => StringWithAggregatesFilterSchema),z.string() ]).optional(),
  address: z.union([ z.lazy(() => StringWithAggregatesFilterSchema),z.string() ]).optional(),
  latitude: z.union([ z.lazy(() => FloatWithAggregatesFilterSchema),z.number() ]).optional(),
  longitude: z.union([ z.lazy(() => FloatWithAggregatesFilterSchema),z.number() ]).optional(),
  postalCode: z.union([ z.lazy(() => StringWithAggregatesFilterSchema),z.string() ]).optional(),
  email: z.union([ z.lazy(() => StringNullableWithAggregatesFilterSchema),z.string() ]).optional().nullable(),
  contactNumber: z.union([ z.lazy(() => StringNullableWithAggregatesFilterSchema),z.string() ]).optional().nullable(),
  website: z.union([ z.lazy(() => StringNullableWithAggregatesFilterSchema),z.string() ]).optional().nullable(),
  inactive: z.union([ z.lazy(() => BoolNullableWithAggregatesFilterSchema),z.boolean() ]).optional().nullable(),
}).strict();

export const VerificationTokenWhereInputSchema: z.ZodType<Prisma.VerificationTokenWhereInput> = z.object({
  AND: z.union([ z.lazy(() => VerificationTokenWhereInputSchema),z.lazy(() => VerificationTokenWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => VerificationTokenWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => VerificationTokenWhereInputSchema),z.lazy(() => VerificationTokenWhereInputSchema).array() ]).optional(),
  identifier: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  token: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  createdAt: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
  challengeTs: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
}).strict();

export const VerificationTokenOrderByWithRelationInputSchema: z.ZodType<Prisma.VerificationTokenOrderByWithRelationInput> = z.object({
  identifier: z.lazy(() => SortOrderSchema).optional(),
  token: z.lazy(() => SortOrderSchema).optional(),
  createdAt: z.lazy(() => SortOrderSchema).optional(),
  challengeTs: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const VerificationTokenWhereUniqueInputSchema: z.ZodType<Prisma.VerificationTokenWhereUniqueInput> = z.object({
  identifier: z.string().cuid()
})
.and(z.object({
  identifier: z.string().cuid().optional(),
  AND: z.union([ z.lazy(() => VerificationTokenWhereInputSchema),z.lazy(() => VerificationTokenWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => VerificationTokenWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => VerificationTokenWhereInputSchema),z.lazy(() => VerificationTokenWhereInputSchema).array() ]).optional(),
  token: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  createdAt: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
  challengeTs: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
}).strict());

export const VerificationTokenOrderByWithAggregationInputSchema: z.ZodType<Prisma.VerificationTokenOrderByWithAggregationInput> = z.object({
  identifier: z.lazy(() => SortOrderSchema).optional(),
  token: z.lazy(() => SortOrderSchema).optional(),
  createdAt: z.lazy(() => SortOrderSchema).optional(),
  challengeTs: z.lazy(() => SortOrderSchema).optional(),
  _count: z.lazy(() => VerificationTokenCountOrderByAggregateInputSchema).optional(),
  _max: z.lazy(() => VerificationTokenMaxOrderByAggregateInputSchema).optional(),
  _min: z.lazy(() => VerificationTokenMinOrderByAggregateInputSchema).optional()
}).strict();

export const VerificationTokenScalarWhereWithAggregatesInputSchema: z.ZodType<Prisma.VerificationTokenScalarWhereWithAggregatesInput> = z.object({
  AND: z.union([ z.lazy(() => VerificationTokenScalarWhereWithAggregatesInputSchema),z.lazy(() => VerificationTokenScalarWhereWithAggregatesInputSchema).array() ]).optional(),
  OR: z.lazy(() => VerificationTokenScalarWhereWithAggregatesInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => VerificationTokenScalarWhereWithAggregatesInputSchema),z.lazy(() => VerificationTokenScalarWhereWithAggregatesInputSchema).array() ]).optional(),
  identifier: z.union([ z.lazy(() => StringWithAggregatesFilterSchema),z.string() ]).optional(),
  token: z.union([ z.lazy(() => StringWithAggregatesFilterSchema),z.string() ]).optional(),
  createdAt: z.union([ z.lazy(() => DateTimeWithAggregatesFilterSchema),z.coerce.date() ]).optional(),
  challengeTs: z.union([ z.lazy(() => StringWithAggregatesFilterSchema),z.string() ]).optional(),
}).strict();

export const CommentWhereInputSchema: z.ZodType<Prisma.CommentWhereInput> = z.object({
  AND: z.union([ z.lazy(() => CommentWhereInputSchema),z.lazy(() => CommentWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => CommentWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => CommentWhereInputSchema),z.lazy(() => CommentWhereInputSchema).array() ]).optional(),
  id: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  resourceId: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  content: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  contentHtml: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  author: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  createdAt: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
  resource: z.union([ z.lazy(() => ResourceRelationFilterSchema),z.lazy(() => ResourceWhereInputSchema) ]).optional(),
}).strict();

export const CommentOrderByWithRelationInputSchema: z.ZodType<Prisma.CommentOrderByWithRelationInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  resourceId: z.lazy(() => SortOrderSchema).optional(),
  content: z.lazy(() => SortOrderSchema).optional(),
  contentHtml: z.lazy(() => SortOrderSchema).optional(),
  author: z.lazy(() => SortOrderSchema).optional(),
  createdAt: z.lazy(() => SortOrderSchema).optional(),
  resource: z.lazy(() => ResourceOrderByWithRelationInputSchema).optional()
}).strict();

export const CommentWhereUniqueInputSchema: z.ZodType<Prisma.CommentWhereUniqueInput> = z.object({
  id: z.string().cuid()
})
.and(z.object({
  id: z.string().cuid().optional(),
  AND: z.union([ z.lazy(() => CommentWhereInputSchema),z.lazy(() => CommentWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => CommentWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => CommentWhereInputSchema),z.lazy(() => CommentWhereInputSchema).array() ]).optional(),
  resourceId: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  content: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  contentHtml: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  author: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  createdAt: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
  resource: z.union([ z.lazy(() => ResourceRelationFilterSchema),z.lazy(() => ResourceWhereInputSchema) ]).optional(),
}).strict());

export const CommentOrderByWithAggregationInputSchema: z.ZodType<Prisma.CommentOrderByWithAggregationInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  resourceId: z.lazy(() => SortOrderSchema).optional(),
  content: z.lazy(() => SortOrderSchema).optional(),
  contentHtml: z.lazy(() => SortOrderSchema).optional(),
  author: z.lazy(() => SortOrderSchema).optional(),
  createdAt: z.lazy(() => SortOrderSchema).optional(),
  _count: z.lazy(() => CommentCountOrderByAggregateInputSchema).optional(),
  _max: z.lazy(() => CommentMaxOrderByAggregateInputSchema).optional(),
  _min: z.lazy(() => CommentMinOrderByAggregateInputSchema).optional()
}).strict();

export const CommentScalarWhereWithAggregatesInputSchema: z.ZodType<Prisma.CommentScalarWhereWithAggregatesInput> = z.object({
  AND: z.union([ z.lazy(() => CommentScalarWhereWithAggregatesInputSchema),z.lazy(() => CommentScalarWhereWithAggregatesInputSchema).array() ]).optional(),
  OR: z.lazy(() => CommentScalarWhereWithAggregatesInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => CommentScalarWhereWithAggregatesInputSchema),z.lazy(() => CommentScalarWhereWithAggregatesInputSchema).array() ]).optional(),
  id: z.union([ z.lazy(() => StringWithAggregatesFilterSchema),z.string() ]).optional(),
  resourceId: z.union([ z.lazy(() => StringWithAggregatesFilterSchema),z.string() ]).optional(),
  content: z.union([ z.lazy(() => StringWithAggregatesFilterSchema),z.string() ]).optional(),
  contentHtml: z.union([ z.lazy(() => StringWithAggregatesFilterSchema),z.string() ]).optional(),
  author: z.union([ z.lazy(() => StringWithAggregatesFilterSchema),z.string() ]).optional(),
  createdAt: z.union([ z.lazy(() => DateTimeWithAggregatesFilterSchema),z.coerce.date() ]).optional(),
}).strict();

export const ResourceCreateInputSchema: z.ZodType<Prisma.ResourceCreateInput> = z.object({
  id: z.string().cuid().optional(),
  name: z.string(),
  category: z.string(),
  address: z.string(),
  latitude: z.number(),
  longitude: z.number(),
  postalCode: z.string(),
  email: z.string().optional().nullable(),
  contactNumber: z.string().optional().nullable(),
  website: z.string().optional().nullable(),
  inactive: z.boolean().optional().nullable(),
  comments: z.lazy(() => CommentCreateNestedManyWithoutResourceInputSchema).optional()
}).strict();

export const ResourceUncheckedCreateInputSchema: z.ZodType<Prisma.ResourceUncheckedCreateInput> = z.object({
  id: z.string().cuid().optional(),
  name: z.string(),
  category: z.string(),
  address: z.string(),
  latitude: z.number(),
  longitude: z.number(),
  postalCode: z.string(),
  email: z.string().optional().nullable(),
  contactNumber: z.string().optional().nullable(),
  website: z.string().optional().nullable(),
  inactive: z.boolean().optional().nullable(),
  comments: z.lazy(() => CommentUncheckedCreateNestedManyWithoutResourceInputSchema).optional()
}).strict();

export const ResourceUpdateInputSchema: z.ZodType<Prisma.ResourceUpdateInput> = z.object({
  id: z.union([ z.string().cuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  category: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  address: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  latitude: z.union([ z.number(),z.lazy(() => FloatFieldUpdateOperationsInputSchema) ]).optional(),
  longitude: z.union([ z.number(),z.lazy(() => FloatFieldUpdateOperationsInputSchema) ]).optional(),
  postalCode: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  email: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  contactNumber: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  website: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  inactive: z.union([ z.boolean(),z.lazy(() => NullableBoolFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  comments: z.lazy(() => CommentUpdateManyWithoutResourceNestedInputSchema).optional()
}).strict();

export const ResourceUncheckedUpdateInputSchema: z.ZodType<Prisma.ResourceUncheckedUpdateInput> = z.object({
  id: z.union([ z.string().cuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  category: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  address: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  latitude: z.union([ z.number(),z.lazy(() => FloatFieldUpdateOperationsInputSchema) ]).optional(),
  longitude: z.union([ z.number(),z.lazy(() => FloatFieldUpdateOperationsInputSchema) ]).optional(),
  postalCode: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  email: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  contactNumber: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  website: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  inactive: z.union([ z.boolean(),z.lazy(() => NullableBoolFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  comments: z.lazy(() => CommentUncheckedUpdateManyWithoutResourceNestedInputSchema).optional()
}).strict();

export const ResourceCreateManyInputSchema: z.ZodType<Prisma.ResourceCreateManyInput> = z.object({
  id: z.string().cuid().optional(),
  name: z.string(),
  category: z.string(),
  address: z.string(),
  latitude: z.number(),
  longitude: z.number(),
  postalCode: z.string(),
  email: z.string().optional().nullable(),
  contactNumber: z.string().optional().nullable(),
  website: z.string().optional().nullable(),
  inactive: z.boolean().optional().nullable()
}).strict();

export const ResourceUpdateManyMutationInputSchema: z.ZodType<Prisma.ResourceUpdateManyMutationInput> = z.object({
  id: z.union([ z.string().cuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  category: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  address: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  latitude: z.union([ z.number(),z.lazy(() => FloatFieldUpdateOperationsInputSchema) ]).optional(),
  longitude: z.union([ z.number(),z.lazy(() => FloatFieldUpdateOperationsInputSchema) ]).optional(),
  postalCode: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  email: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  contactNumber: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  website: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  inactive: z.union([ z.boolean(),z.lazy(() => NullableBoolFieldUpdateOperationsInputSchema) ]).optional().nullable(),
}).strict();

export const ResourceUncheckedUpdateManyInputSchema: z.ZodType<Prisma.ResourceUncheckedUpdateManyInput> = z.object({
  id: z.union([ z.string().cuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  category: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  address: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  latitude: z.union([ z.number(),z.lazy(() => FloatFieldUpdateOperationsInputSchema) ]).optional(),
  longitude: z.union([ z.number(),z.lazy(() => FloatFieldUpdateOperationsInputSchema) ]).optional(),
  postalCode: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  email: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  contactNumber: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  website: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  inactive: z.union([ z.boolean(),z.lazy(() => NullableBoolFieldUpdateOperationsInputSchema) ]).optional().nullable(),
}).strict();

export const VerificationTokenCreateInputSchema: z.ZodType<Prisma.VerificationTokenCreateInput> = z.object({
  identifier: z.string().cuid().optional(),
  token: z.string(),
  createdAt: z.coerce.date().optional(),
  challengeTs: z.string()
}).strict();

export const VerificationTokenUncheckedCreateInputSchema: z.ZodType<Prisma.VerificationTokenUncheckedCreateInput> = z.object({
  identifier: z.string().cuid().optional(),
  token: z.string(),
  createdAt: z.coerce.date().optional(),
  challengeTs: z.string()
}).strict();

export const VerificationTokenUpdateInputSchema: z.ZodType<Prisma.VerificationTokenUpdateInput> = z.object({
  identifier: z.union([ z.string().cuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  token: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  challengeTs: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const VerificationTokenUncheckedUpdateInputSchema: z.ZodType<Prisma.VerificationTokenUncheckedUpdateInput> = z.object({
  identifier: z.union([ z.string().cuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  token: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  challengeTs: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const VerificationTokenCreateManyInputSchema: z.ZodType<Prisma.VerificationTokenCreateManyInput> = z.object({
  identifier: z.string().cuid().optional(),
  token: z.string(),
  createdAt: z.coerce.date().optional(),
  challengeTs: z.string()
}).strict();

export const VerificationTokenUpdateManyMutationInputSchema: z.ZodType<Prisma.VerificationTokenUpdateManyMutationInput> = z.object({
  identifier: z.union([ z.string().cuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  token: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  challengeTs: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const VerificationTokenUncheckedUpdateManyInputSchema: z.ZodType<Prisma.VerificationTokenUncheckedUpdateManyInput> = z.object({
  identifier: z.union([ z.string().cuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  token: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  challengeTs: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const CommentCreateInputSchema: z.ZodType<Prisma.CommentCreateInput> = z.object({
  id: z.string().cuid().optional(),
  content: z.string(),
  contentHtml: z.string(),
  author: z.string(),
  createdAt: z.coerce.date().optional(),
  resource: z.lazy(() => ResourceCreateNestedOneWithoutCommentsInputSchema)
}).strict();

export const CommentUncheckedCreateInputSchema: z.ZodType<Prisma.CommentUncheckedCreateInput> = z.object({
  id: z.string().cuid().optional(),
  resourceId: z.string(),
  content: z.string(),
  contentHtml: z.string(),
  author: z.string(),
  createdAt: z.coerce.date().optional()
}).strict();

export const CommentUpdateInputSchema: z.ZodType<Prisma.CommentUpdateInput> = z.object({
  id: z.union([ z.string().cuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  content: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  contentHtml: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  author: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  resource: z.lazy(() => ResourceUpdateOneRequiredWithoutCommentsNestedInputSchema).optional()
}).strict();

export const CommentUncheckedUpdateInputSchema: z.ZodType<Prisma.CommentUncheckedUpdateInput> = z.object({
  id: z.union([ z.string().cuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  resourceId: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  content: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  contentHtml: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  author: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const CommentCreateManyInputSchema: z.ZodType<Prisma.CommentCreateManyInput> = z.object({
  id: z.string().cuid().optional(),
  resourceId: z.string(),
  content: z.string(),
  contentHtml: z.string(),
  author: z.string(),
  createdAt: z.coerce.date().optional()
}).strict();

export const CommentUpdateManyMutationInputSchema: z.ZodType<Prisma.CommentUpdateManyMutationInput> = z.object({
  id: z.union([ z.string().cuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  content: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  contentHtml: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  author: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const CommentUncheckedUpdateManyInputSchema: z.ZodType<Prisma.CommentUncheckedUpdateManyInput> = z.object({
  id: z.union([ z.string().cuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  resourceId: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  content: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  contentHtml: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  author: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const StringFilterSchema: z.ZodType<Prisma.StringFilter> = z.object({
  equals: z.string().optional(),
  in: z.string().array().optional(),
  notIn: z.string().array().optional(),
  lt: z.string().optional(),
  lte: z.string().optional(),
  gt: z.string().optional(),
  gte: z.string().optional(),
  contains: z.string().optional(),
  startsWith: z.string().optional(),
  endsWith: z.string().optional(),
  mode: z.lazy(() => QueryModeSchema).optional(),
  not: z.union([ z.string(),z.lazy(() => NestedStringFilterSchema) ]).optional(),
}).strict();

export const FloatFilterSchema: z.ZodType<Prisma.FloatFilter> = z.object({
  equals: z.number().optional(),
  in: z.number().array().optional(),
  notIn: z.number().array().optional(),
  lt: z.number().optional(),
  lte: z.number().optional(),
  gt: z.number().optional(),
  gte: z.number().optional(),
  not: z.union([ z.number(),z.lazy(() => NestedFloatFilterSchema) ]).optional(),
}).strict();

export const StringNullableFilterSchema: z.ZodType<Prisma.StringNullableFilter> = z.object({
  equals: z.string().optional().nullable(),
  in: z.string().array().optional().nullable(),
  notIn: z.string().array().optional().nullable(),
  lt: z.string().optional(),
  lte: z.string().optional(),
  gt: z.string().optional(),
  gte: z.string().optional(),
  contains: z.string().optional(),
  startsWith: z.string().optional(),
  endsWith: z.string().optional(),
  mode: z.lazy(() => QueryModeSchema).optional(),
  not: z.union([ z.string(),z.lazy(() => NestedStringNullableFilterSchema) ]).optional().nullable(),
}).strict();

export const BoolNullableFilterSchema: z.ZodType<Prisma.BoolNullableFilter> = z.object({
  equals: z.boolean().optional().nullable(),
  not: z.union([ z.boolean(),z.lazy(() => NestedBoolNullableFilterSchema) ]).optional().nullable(),
}).strict();

export const CommentListRelationFilterSchema: z.ZodType<Prisma.CommentListRelationFilter> = z.object({
  every: z.lazy(() => CommentWhereInputSchema).optional(),
  some: z.lazy(() => CommentWhereInputSchema).optional(),
  none: z.lazy(() => CommentWhereInputSchema).optional()
}).strict();

export const SortOrderInputSchema: z.ZodType<Prisma.SortOrderInput> = z.object({
  sort: z.lazy(() => SortOrderSchema),
  nulls: z.lazy(() => NullsOrderSchema).optional()
}).strict();

export const CommentOrderByRelationAggregateInputSchema: z.ZodType<Prisma.CommentOrderByRelationAggregateInput> = z.object({
  _count: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const ResourceCountOrderByAggregateInputSchema: z.ZodType<Prisma.ResourceCountOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  name: z.lazy(() => SortOrderSchema).optional(),
  category: z.lazy(() => SortOrderSchema).optional(),
  address: z.lazy(() => SortOrderSchema).optional(),
  latitude: z.lazy(() => SortOrderSchema).optional(),
  longitude: z.lazy(() => SortOrderSchema).optional(),
  postalCode: z.lazy(() => SortOrderSchema).optional(),
  email: z.lazy(() => SortOrderSchema).optional(),
  contactNumber: z.lazy(() => SortOrderSchema).optional(),
  website: z.lazy(() => SortOrderSchema).optional(),
  inactive: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const ResourceAvgOrderByAggregateInputSchema: z.ZodType<Prisma.ResourceAvgOrderByAggregateInput> = z.object({
  latitude: z.lazy(() => SortOrderSchema).optional(),
  longitude: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const ResourceMaxOrderByAggregateInputSchema: z.ZodType<Prisma.ResourceMaxOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  name: z.lazy(() => SortOrderSchema).optional(),
  category: z.lazy(() => SortOrderSchema).optional(),
  address: z.lazy(() => SortOrderSchema).optional(),
  latitude: z.lazy(() => SortOrderSchema).optional(),
  longitude: z.lazy(() => SortOrderSchema).optional(),
  postalCode: z.lazy(() => SortOrderSchema).optional(),
  email: z.lazy(() => SortOrderSchema).optional(),
  contactNumber: z.lazy(() => SortOrderSchema).optional(),
  website: z.lazy(() => SortOrderSchema).optional(),
  inactive: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const ResourceMinOrderByAggregateInputSchema: z.ZodType<Prisma.ResourceMinOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  name: z.lazy(() => SortOrderSchema).optional(),
  category: z.lazy(() => SortOrderSchema).optional(),
  address: z.lazy(() => SortOrderSchema).optional(),
  latitude: z.lazy(() => SortOrderSchema).optional(),
  longitude: z.lazy(() => SortOrderSchema).optional(),
  postalCode: z.lazy(() => SortOrderSchema).optional(),
  email: z.lazy(() => SortOrderSchema).optional(),
  contactNumber: z.lazy(() => SortOrderSchema).optional(),
  website: z.lazy(() => SortOrderSchema).optional(),
  inactive: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const ResourceSumOrderByAggregateInputSchema: z.ZodType<Prisma.ResourceSumOrderByAggregateInput> = z.object({
  latitude: z.lazy(() => SortOrderSchema).optional(),
  longitude: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const StringWithAggregatesFilterSchema: z.ZodType<Prisma.StringWithAggregatesFilter> = z.object({
  equals: z.string().optional(),
  in: z.string().array().optional(),
  notIn: z.string().array().optional(),
  lt: z.string().optional(),
  lte: z.string().optional(),
  gt: z.string().optional(),
  gte: z.string().optional(),
  contains: z.string().optional(),
  startsWith: z.string().optional(),
  endsWith: z.string().optional(),
  mode: z.lazy(() => QueryModeSchema).optional(),
  not: z.union([ z.string(),z.lazy(() => NestedStringWithAggregatesFilterSchema) ]).optional(),
  _count: z.lazy(() => NestedIntFilterSchema).optional(),
  _min: z.lazy(() => NestedStringFilterSchema).optional(),
  _max: z.lazy(() => NestedStringFilterSchema).optional()
}).strict();

export const FloatWithAggregatesFilterSchema: z.ZodType<Prisma.FloatWithAggregatesFilter> = z.object({
  equals: z.number().optional(),
  in: z.number().array().optional(),
  notIn: z.number().array().optional(),
  lt: z.number().optional(),
  lte: z.number().optional(),
  gt: z.number().optional(),
  gte: z.number().optional(),
  not: z.union([ z.number(),z.lazy(() => NestedFloatWithAggregatesFilterSchema) ]).optional(),
  _count: z.lazy(() => NestedIntFilterSchema).optional(),
  _avg: z.lazy(() => NestedFloatFilterSchema).optional(),
  _sum: z.lazy(() => NestedFloatFilterSchema).optional(),
  _min: z.lazy(() => NestedFloatFilterSchema).optional(),
  _max: z.lazy(() => NestedFloatFilterSchema).optional()
}).strict();

export const StringNullableWithAggregatesFilterSchema: z.ZodType<Prisma.StringNullableWithAggregatesFilter> = z.object({
  equals: z.string().optional().nullable(),
  in: z.string().array().optional().nullable(),
  notIn: z.string().array().optional().nullable(),
  lt: z.string().optional(),
  lte: z.string().optional(),
  gt: z.string().optional(),
  gte: z.string().optional(),
  contains: z.string().optional(),
  startsWith: z.string().optional(),
  endsWith: z.string().optional(),
  mode: z.lazy(() => QueryModeSchema).optional(),
  not: z.union([ z.string(),z.lazy(() => NestedStringNullableWithAggregatesFilterSchema) ]).optional().nullable(),
  _count: z.lazy(() => NestedIntNullableFilterSchema).optional(),
  _min: z.lazy(() => NestedStringNullableFilterSchema).optional(),
  _max: z.lazy(() => NestedStringNullableFilterSchema).optional()
}).strict();

export const BoolNullableWithAggregatesFilterSchema: z.ZodType<Prisma.BoolNullableWithAggregatesFilter> = z.object({
  equals: z.boolean().optional().nullable(),
  not: z.union([ z.boolean(),z.lazy(() => NestedBoolNullableWithAggregatesFilterSchema) ]).optional().nullable(),
  _count: z.lazy(() => NestedIntNullableFilterSchema).optional(),
  _min: z.lazy(() => NestedBoolNullableFilterSchema).optional(),
  _max: z.lazy(() => NestedBoolNullableFilterSchema).optional()
}).strict();

export const DateTimeFilterSchema: z.ZodType<Prisma.DateTimeFilter> = z.object({
  equals: z.coerce.date().optional(),
  in: z.coerce.date().array().optional(),
  notIn: z.coerce.date().array().optional(),
  lt: z.coerce.date().optional(),
  lte: z.coerce.date().optional(),
  gt: z.coerce.date().optional(),
  gte: z.coerce.date().optional(),
  not: z.union([ z.coerce.date(),z.lazy(() => NestedDateTimeFilterSchema) ]).optional(),
}).strict();

export const VerificationTokenCountOrderByAggregateInputSchema: z.ZodType<Prisma.VerificationTokenCountOrderByAggregateInput> = z.object({
  identifier: z.lazy(() => SortOrderSchema).optional(),
  token: z.lazy(() => SortOrderSchema).optional(),
  createdAt: z.lazy(() => SortOrderSchema).optional(),
  challengeTs: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const VerificationTokenMaxOrderByAggregateInputSchema: z.ZodType<Prisma.VerificationTokenMaxOrderByAggregateInput> = z.object({
  identifier: z.lazy(() => SortOrderSchema).optional(),
  token: z.lazy(() => SortOrderSchema).optional(),
  createdAt: z.lazy(() => SortOrderSchema).optional(),
  challengeTs: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const VerificationTokenMinOrderByAggregateInputSchema: z.ZodType<Prisma.VerificationTokenMinOrderByAggregateInput> = z.object({
  identifier: z.lazy(() => SortOrderSchema).optional(),
  token: z.lazy(() => SortOrderSchema).optional(),
  createdAt: z.lazy(() => SortOrderSchema).optional(),
  challengeTs: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const DateTimeWithAggregatesFilterSchema: z.ZodType<Prisma.DateTimeWithAggregatesFilter> = z.object({
  equals: z.coerce.date().optional(),
  in: z.coerce.date().array().optional(),
  notIn: z.coerce.date().array().optional(),
  lt: z.coerce.date().optional(),
  lte: z.coerce.date().optional(),
  gt: z.coerce.date().optional(),
  gte: z.coerce.date().optional(),
  not: z.union([ z.coerce.date(),z.lazy(() => NestedDateTimeWithAggregatesFilterSchema) ]).optional(),
  _count: z.lazy(() => NestedIntFilterSchema).optional(),
  _min: z.lazy(() => NestedDateTimeFilterSchema).optional(),
  _max: z.lazy(() => NestedDateTimeFilterSchema).optional()
}).strict();

export const ResourceRelationFilterSchema: z.ZodType<Prisma.ResourceRelationFilter> = z.object({
  is: z.lazy(() => ResourceWhereInputSchema).optional(),
  isNot: z.lazy(() => ResourceWhereInputSchema).optional()
}).strict();

export const CommentCountOrderByAggregateInputSchema: z.ZodType<Prisma.CommentCountOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  resourceId: z.lazy(() => SortOrderSchema).optional(),
  content: z.lazy(() => SortOrderSchema).optional(),
  contentHtml: z.lazy(() => SortOrderSchema).optional(),
  author: z.lazy(() => SortOrderSchema).optional(),
  createdAt: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const CommentMaxOrderByAggregateInputSchema: z.ZodType<Prisma.CommentMaxOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  resourceId: z.lazy(() => SortOrderSchema).optional(),
  content: z.lazy(() => SortOrderSchema).optional(),
  contentHtml: z.lazy(() => SortOrderSchema).optional(),
  author: z.lazy(() => SortOrderSchema).optional(),
  createdAt: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const CommentMinOrderByAggregateInputSchema: z.ZodType<Prisma.CommentMinOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  resourceId: z.lazy(() => SortOrderSchema).optional(),
  content: z.lazy(() => SortOrderSchema).optional(),
  contentHtml: z.lazy(() => SortOrderSchema).optional(),
  author: z.lazy(() => SortOrderSchema).optional(),
  createdAt: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const CommentCreateNestedManyWithoutResourceInputSchema: z.ZodType<Prisma.CommentCreateNestedManyWithoutResourceInput> = z.object({
  create: z.union([ z.lazy(() => CommentCreateWithoutResourceInputSchema),z.lazy(() => CommentCreateWithoutResourceInputSchema).array(),z.lazy(() => CommentUncheckedCreateWithoutResourceInputSchema),z.lazy(() => CommentUncheckedCreateWithoutResourceInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => CommentCreateOrConnectWithoutResourceInputSchema),z.lazy(() => CommentCreateOrConnectWithoutResourceInputSchema).array() ]).optional(),
  createMany: z.lazy(() => CommentCreateManyResourceInputEnvelopeSchema).optional(),
  connect: z.union([ z.lazy(() => CommentWhereUniqueInputSchema),z.lazy(() => CommentWhereUniqueInputSchema).array() ]).optional(),
}).strict();

export const CommentUncheckedCreateNestedManyWithoutResourceInputSchema: z.ZodType<Prisma.CommentUncheckedCreateNestedManyWithoutResourceInput> = z.object({
  create: z.union([ z.lazy(() => CommentCreateWithoutResourceInputSchema),z.lazy(() => CommentCreateWithoutResourceInputSchema).array(),z.lazy(() => CommentUncheckedCreateWithoutResourceInputSchema),z.lazy(() => CommentUncheckedCreateWithoutResourceInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => CommentCreateOrConnectWithoutResourceInputSchema),z.lazy(() => CommentCreateOrConnectWithoutResourceInputSchema).array() ]).optional(),
  createMany: z.lazy(() => CommentCreateManyResourceInputEnvelopeSchema).optional(),
  connect: z.union([ z.lazy(() => CommentWhereUniqueInputSchema),z.lazy(() => CommentWhereUniqueInputSchema).array() ]).optional(),
}).strict();

export const StringFieldUpdateOperationsInputSchema: z.ZodType<Prisma.StringFieldUpdateOperationsInput> = z.object({
  set: z.string().optional()
}).strict();

export const FloatFieldUpdateOperationsInputSchema: z.ZodType<Prisma.FloatFieldUpdateOperationsInput> = z.object({
  set: z.number().optional(),
  increment: z.number().optional(),
  decrement: z.number().optional(),
  multiply: z.number().optional(),
  divide: z.number().optional()
}).strict();

export const NullableStringFieldUpdateOperationsInputSchema: z.ZodType<Prisma.NullableStringFieldUpdateOperationsInput> = z.object({
  set: z.string().optional().nullable()
}).strict();

export const NullableBoolFieldUpdateOperationsInputSchema: z.ZodType<Prisma.NullableBoolFieldUpdateOperationsInput> = z.object({
  set: z.boolean().optional().nullable()
}).strict();

export const CommentUpdateManyWithoutResourceNestedInputSchema: z.ZodType<Prisma.CommentUpdateManyWithoutResourceNestedInput> = z.object({
  create: z.union([ z.lazy(() => CommentCreateWithoutResourceInputSchema),z.lazy(() => CommentCreateWithoutResourceInputSchema).array(),z.lazy(() => CommentUncheckedCreateWithoutResourceInputSchema),z.lazy(() => CommentUncheckedCreateWithoutResourceInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => CommentCreateOrConnectWithoutResourceInputSchema),z.lazy(() => CommentCreateOrConnectWithoutResourceInputSchema).array() ]).optional(),
  upsert: z.union([ z.lazy(() => CommentUpsertWithWhereUniqueWithoutResourceInputSchema),z.lazy(() => CommentUpsertWithWhereUniqueWithoutResourceInputSchema).array() ]).optional(),
  createMany: z.lazy(() => CommentCreateManyResourceInputEnvelopeSchema).optional(),
  set: z.union([ z.lazy(() => CommentWhereUniqueInputSchema),z.lazy(() => CommentWhereUniqueInputSchema).array() ]).optional(),
  disconnect: z.union([ z.lazy(() => CommentWhereUniqueInputSchema),z.lazy(() => CommentWhereUniqueInputSchema).array() ]).optional(),
  delete: z.union([ z.lazy(() => CommentWhereUniqueInputSchema),z.lazy(() => CommentWhereUniqueInputSchema).array() ]).optional(),
  connect: z.union([ z.lazy(() => CommentWhereUniqueInputSchema),z.lazy(() => CommentWhereUniqueInputSchema).array() ]).optional(),
  update: z.union([ z.lazy(() => CommentUpdateWithWhereUniqueWithoutResourceInputSchema),z.lazy(() => CommentUpdateWithWhereUniqueWithoutResourceInputSchema).array() ]).optional(),
  updateMany: z.union([ z.lazy(() => CommentUpdateManyWithWhereWithoutResourceInputSchema),z.lazy(() => CommentUpdateManyWithWhereWithoutResourceInputSchema).array() ]).optional(),
  deleteMany: z.union([ z.lazy(() => CommentScalarWhereInputSchema),z.lazy(() => CommentScalarWhereInputSchema).array() ]).optional(),
}).strict();

export const CommentUncheckedUpdateManyWithoutResourceNestedInputSchema: z.ZodType<Prisma.CommentUncheckedUpdateManyWithoutResourceNestedInput> = z.object({
  create: z.union([ z.lazy(() => CommentCreateWithoutResourceInputSchema),z.lazy(() => CommentCreateWithoutResourceInputSchema).array(),z.lazy(() => CommentUncheckedCreateWithoutResourceInputSchema),z.lazy(() => CommentUncheckedCreateWithoutResourceInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => CommentCreateOrConnectWithoutResourceInputSchema),z.lazy(() => CommentCreateOrConnectWithoutResourceInputSchema).array() ]).optional(),
  upsert: z.union([ z.lazy(() => CommentUpsertWithWhereUniqueWithoutResourceInputSchema),z.lazy(() => CommentUpsertWithWhereUniqueWithoutResourceInputSchema).array() ]).optional(),
  createMany: z.lazy(() => CommentCreateManyResourceInputEnvelopeSchema).optional(),
  set: z.union([ z.lazy(() => CommentWhereUniqueInputSchema),z.lazy(() => CommentWhereUniqueInputSchema).array() ]).optional(),
  disconnect: z.union([ z.lazy(() => CommentWhereUniqueInputSchema),z.lazy(() => CommentWhereUniqueInputSchema).array() ]).optional(),
  delete: z.union([ z.lazy(() => CommentWhereUniqueInputSchema),z.lazy(() => CommentWhereUniqueInputSchema).array() ]).optional(),
  connect: z.union([ z.lazy(() => CommentWhereUniqueInputSchema),z.lazy(() => CommentWhereUniqueInputSchema).array() ]).optional(),
  update: z.union([ z.lazy(() => CommentUpdateWithWhereUniqueWithoutResourceInputSchema),z.lazy(() => CommentUpdateWithWhereUniqueWithoutResourceInputSchema).array() ]).optional(),
  updateMany: z.union([ z.lazy(() => CommentUpdateManyWithWhereWithoutResourceInputSchema),z.lazy(() => CommentUpdateManyWithWhereWithoutResourceInputSchema).array() ]).optional(),
  deleteMany: z.union([ z.lazy(() => CommentScalarWhereInputSchema),z.lazy(() => CommentScalarWhereInputSchema).array() ]).optional(),
}).strict();

export const DateTimeFieldUpdateOperationsInputSchema: z.ZodType<Prisma.DateTimeFieldUpdateOperationsInput> = z.object({
  set: z.coerce.date().optional()
}).strict();

export const ResourceCreateNestedOneWithoutCommentsInputSchema: z.ZodType<Prisma.ResourceCreateNestedOneWithoutCommentsInput> = z.object({
  create: z.union([ z.lazy(() => ResourceCreateWithoutCommentsInputSchema),z.lazy(() => ResourceUncheckedCreateWithoutCommentsInputSchema) ]).optional(),
  connectOrCreate: z.lazy(() => ResourceCreateOrConnectWithoutCommentsInputSchema).optional(),
  connect: z.lazy(() => ResourceWhereUniqueInputSchema).optional()
}).strict();

export const ResourceUpdateOneRequiredWithoutCommentsNestedInputSchema: z.ZodType<Prisma.ResourceUpdateOneRequiredWithoutCommentsNestedInput> = z.object({
  create: z.union([ z.lazy(() => ResourceCreateWithoutCommentsInputSchema),z.lazy(() => ResourceUncheckedCreateWithoutCommentsInputSchema) ]).optional(),
  connectOrCreate: z.lazy(() => ResourceCreateOrConnectWithoutCommentsInputSchema).optional(),
  upsert: z.lazy(() => ResourceUpsertWithoutCommentsInputSchema).optional(),
  connect: z.lazy(() => ResourceWhereUniqueInputSchema).optional(),
  update: z.union([ z.lazy(() => ResourceUpdateToOneWithWhereWithoutCommentsInputSchema),z.lazy(() => ResourceUpdateWithoutCommentsInputSchema),z.lazy(() => ResourceUncheckedUpdateWithoutCommentsInputSchema) ]).optional(),
}).strict();

export const NestedStringFilterSchema: z.ZodType<Prisma.NestedStringFilter> = z.object({
  equals: z.string().optional(),
  in: z.string().array().optional(),
  notIn: z.string().array().optional(),
  lt: z.string().optional(),
  lte: z.string().optional(),
  gt: z.string().optional(),
  gte: z.string().optional(),
  contains: z.string().optional(),
  startsWith: z.string().optional(),
  endsWith: z.string().optional(),
  not: z.union([ z.string(),z.lazy(() => NestedStringFilterSchema) ]).optional(),
}).strict();

export const NestedFloatFilterSchema: z.ZodType<Prisma.NestedFloatFilter> = z.object({
  equals: z.number().optional(),
  in: z.number().array().optional(),
  notIn: z.number().array().optional(),
  lt: z.number().optional(),
  lte: z.number().optional(),
  gt: z.number().optional(),
  gte: z.number().optional(),
  not: z.union([ z.number(),z.lazy(() => NestedFloatFilterSchema) ]).optional(),
}).strict();

export const NestedStringNullableFilterSchema: z.ZodType<Prisma.NestedStringNullableFilter> = z.object({
  equals: z.string().optional().nullable(),
  in: z.string().array().optional().nullable(),
  notIn: z.string().array().optional().nullable(),
  lt: z.string().optional(),
  lte: z.string().optional(),
  gt: z.string().optional(),
  gte: z.string().optional(),
  contains: z.string().optional(),
  startsWith: z.string().optional(),
  endsWith: z.string().optional(),
  not: z.union([ z.string(),z.lazy(() => NestedStringNullableFilterSchema) ]).optional().nullable(),
}).strict();

export const NestedBoolNullableFilterSchema: z.ZodType<Prisma.NestedBoolNullableFilter> = z.object({
  equals: z.boolean().optional().nullable(),
  not: z.union([ z.boolean(),z.lazy(() => NestedBoolNullableFilterSchema) ]).optional().nullable(),
}).strict();

export const NestedStringWithAggregatesFilterSchema: z.ZodType<Prisma.NestedStringWithAggregatesFilter> = z.object({
  equals: z.string().optional(),
  in: z.string().array().optional(),
  notIn: z.string().array().optional(),
  lt: z.string().optional(),
  lte: z.string().optional(),
  gt: z.string().optional(),
  gte: z.string().optional(),
  contains: z.string().optional(),
  startsWith: z.string().optional(),
  endsWith: z.string().optional(),
  not: z.union([ z.string(),z.lazy(() => NestedStringWithAggregatesFilterSchema) ]).optional(),
  _count: z.lazy(() => NestedIntFilterSchema).optional(),
  _min: z.lazy(() => NestedStringFilterSchema).optional(),
  _max: z.lazy(() => NestedStringFilterSchema).optional()
}).strict();

export const NestedIntFilterSchema: z.ZodType<Prisma.NestedIntFilter> = z.object({
  equals: z.number().optional(),
  in: z.number().array().optional(),
  notIn: z.number().array().optional(),
  lt: z.number().optional(),
  lte: z.number().optional(),
  gt: z.number().optional(),
  gte: z.number().optional(),
  not: z.union([ z.number(),z.lazy(() => NestedIntFilterSchema) ]).optional(),
}).strict();

export const NestedFloatWithAggregatesFilterSchema: z.ZodType<Prisma.NestedFloatWithAggregatesFilter> = z.object({
  equals: z.number().optional(),
  in: z.number().array().optional(),
  notIn: z.number().array().optional(),
  lt: z.number().optional(),
  lte: z.number().optional(),
  gt: z.number().optional(),
  gte: z.number().optional(),
  not: z.union([ z.number(),z.lazy(() => NestedFloatWithAggregatesFilterSchema) ]).optional(),
  _count: z.lazy(() => NestedIntFilterSchema).optional(),
  _avg: z.lazy(() => NestedFloatFilterSchema).optional(),
  _sum: z.lazy(() => NestedFloatFilterSchema).optional(),
  _min: z.lazy(() => NestedFloatFilterSchema).optional(),
  _max: z.lazy(() => NestedFloatFilterSchema).optional()
}).strict();

export const NestedStringNullableWithAggregatesFilterSchema: z.ZodType<Prisma.NestedStringNullableWithAggregatesFilter> = z.object({
  equals: z.string().optional().nullable(),
  in: z.string().array().optional().nullable(),
  notIn: z.string().array().optional().nullable(),
  lt: z.string().optional(),
  lte: z.string().optional(),
  gt: z.string().optional(),
  gte: z.string().optional(),
  contains: z.string().optional(),
  startsWith: z.string().optional(),
  endsWith: z.string().optional(),
  not: z.union([ z.string(),z.lazy(() => NestedStringNullableWithAggregatesFilterSchema) ]).optional().nullable(),
  _count: z.lazy(() => NestedIntNullableFilterSchema).optional(),
  _min: z.lazy(() => NestedStringNullableFilterSchema).optional(),
  _max: z.lazy(() => NestedStringNullableFilterSchema).optional()
}).strict();

export const NestedIntNullableFilterSchema: z.ZodType<Prisma.NestedIntNullableFilter> = z.object({
  equals: z.number().optional().nullable(),
  in: z.number().array().optional().nullable(),
  notIn: z.number().array().optional().nullable(),
  lt: z.number().optional(),
  lte: z.number().optional(),
  gt: z.number().optional(),
  gte: z.number().optional(),
  not: z.union([ z.number(),z.lazy(() => NestedIntNullableFilterSchema) ]).optional().nullable(),
}).strict();

export const NestedBoolNullableWithAggregatesFilterSchema: z.ZodType<Prisma.NestedBoolNullableWithAggregatesFilter> = z.object({
  equals: z.boolean().optional().nullable(),
  not: z.union([ z.boolean(),z.lazy(() => NestedBoolNullableWithAggregatesFilterSchema) ]).optional().nullable(),
  _count: z.lazy(() => NestedIntNullableFilterSchema).optional(),
  _min: z.lazy(() => NestedBoolNullableFilterSchema).optional(),
  _max: z.lazy(() => NestedBoolNullableFilterSchema).optional()
}).strict();

export const NestedDateTimeFilterSchema: z.ZodType<Prisma.NestedDateTimeFilter> = z.object({
  equals: z.coerce.date().optional(),
  in: z.coerce.date().array().optional(),
  notIn: z.coerce.date().array().optional(),
  lt: z.coerce.date().optional(),
  lte: z.coerce.date().optional(),
  gt: z.coerce.date().optional(),
  gte: z.coerce.date().optional(),
  not: z.union([ z.coerce.date(),z.lazy(() => NestedDateTimeFilterSchema) ]).optional(),
}).strict();

export const NestedDateTimeWithAggregatesFilterSchema: z.ZodType<Prisma.NestedDateTimeWithAggregatesFilter> = z.object({
  equals: z.coerce.date().optional(),
  in: z.coerce.date().array().optional(),
  notIn: z.coerce.date().array().optional(),
  lt: z.coerce.date().optional(),
  lte: z.coerce.date().optional(),
  gt: z.coerce.date().optional(),
  gte: z.coerce.date().optional(),
  not: z.union([ z.coerce.date(),z.lazy(() => NestedDateTimeWithAggregatesFilterSchema) ]).optional(),
  _count: z.lazy(() => NestedIntFilterSchema).optional(),
  _min: z.lazy(() => NestedDateTimeFilterSchema).optional(),
  _max: z.lazy(() => NestedDateTimeFilterSchema).optional()
}).strict();

export const CommentCreateWithoutResourceInputSchema: z.ZodType<Prisma.CommentCreateWithoutResourceInput> = z.object({
  id: z.string().cuid().optional(),
  content: z.string(),
  contentHtml: z.string(),
  author: z.string(),
  createdAt: z.coerce.date().optional()
}).strict();

export const CommentUncheckedCreateWithoutResourceInputSchema: z.ZodType<Prisma.CommentUncheckedCreateWithoutResourceInput> = z.object({
  id: z.string().cuid().optional(),
  content: z.string(),
  contentHtml: z.string(),
  author: z.string(),
  createdAt: z.coerce.date().optional()
}).strict();

export const CommentCreateOrConnectWithoutResourceInputSchema: z.ZodType<Prisma.CommentCreateOrConnectWithoutResourceInput> = z.object({
  where: z.lazy(() => CommentWhereUniqueInputSchema),
  create: z.union([ z.lazy(() => CommentCreateWithoutResourceInputSchema),z.lazy(() => CommentUncheckedCreateWithoutResourceInputSchema) ]),
}).strict();

export const CommentCreateManyResourceInputEnvelopeSchema: z.ZodType<Prisma.CommentCreateManyResourceInputEnvelope> = z.object({
  data: z.union([ z.lazy(() => CommentCreateManyResourceInputSchema),z.lazy(() => CommentCreateManyResourceInputSchema).array() ]),
  skipDuplicates: z.boolean().optional()
}).strict();

export const CommentUpsertWithWhereUniqueWithoutResourceInputSchema: z.ZodType<Prisma.CommentUpsertWithWhereUniqueWithoutResourceInput> = z.object({
  where: z.lazy(() => CommentWhereUniqueInputSchema),
  update: z.union([ z.lazy(() => CommentUpdateWithoutResourceInputSchema),z.lazy(() => CommentUncheckedUpdateWithoutResourceInputSchema) ]),
  create: z.union([ z.lazy(() => CommentCreateWithoutResourceInputSchema),z.lazy(() => CommentUncheckedCreateWithoutResourceInputSchema) ]),
}).strict();

export const CommentUpdateWithWhereUniqueWithoutResourceInputSchema: z.ZodType<Prisma.CommentUpdateWithWhereUniqueWithoutResourceInput> = z.object({
  where: z.lazy(() => CommentWhereUniqueInputSchema),
  data: z.union([ z.lazy(() => CommentUpdateWithoutResourceInputSchema),z.lazy(() => CommentUncheckedUpdateWithoutResourceInputSchema) ]),
}).strict();

export const CommentUpdateManyWithWhereWithoutResourceInputSchema: z.ZodType<Prisma.CommentUpdateManyWithWhereWithoutResourceInput> = z.object({
  where: z.lazy(() => CommentScalarWhereInputSchema),
  data: z.union([ z.lazy(() => CommentUpdateManyMutationInputSchema),z.lazy(() => CommentUncheckedUpdateManyWithoutResourceInputSchema) ]),
}).strict();

export const CommentScalarWhereInputSchema: z.ZodType<Prisma.CommentScalarWhereInput> = z.object({
  AND: z.union([ z.lazy(() => CommentScalarWhereInputSchema),z.lazy(() => CommentScalarWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => CommentScalarWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => CommentScalarWhereInputSchema),z.lazy(() => CommentScalarWhereInputSchema).array() ]).optional(),
  id: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  resourceId: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  content: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  contentHtml: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  author: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  createdAt: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
}).strict();

export const ResourceCreateWithoutCommentsInputSchema: z.ZodType<Prisma.ResourceCreateWithoutCommentsInput> = z.object({
  id: z.string().cuid().optional(),
  name: z.string(),
  category: z.string(),
  address: z.string(),
  latitude: z.number(),
  longitude: z.number(),
  postalCode: z.string(),
  email: z.string().optional().nullable(),
  contactNumber: z.string().optional().nullable(),
  website: z.string().optional().nullable(),
  inactive: z.boolean().optional().nullable()
}).strict();

export const ResourceUncheckedCreateWithoutCommentsInputSchema: z.ZodType<Prisma.ResourceUncheckedCreateWithoutCommentsInput> = z.object({
  id: z.string().cuid().optional(),
  name: z.string(),
  category: z.string(),
  address: z.string(),
  latitude: z.number(),
  longitude: z.number(),
  postalCode: z.string(),
  email: z.string().optional().nullable(),
  contactNumber: z.string().optional().nullable(),
  website: z.string().optional().nullable(),
  inactive: z.boolean().optional().nullable()
}).strict();

export const ResourceCreateOrConnectWithoutCommentsInputSchema: z.ZodType<Prisma.ResourceCreateOrConnectWithoutCommentsInput> = z.object({
  where: z.lazy(() => ResourceWhereUniqueInputSchema),
  create: z.union([ z.lazy(() => ResourceCreateWithoutCommentsInputSchema),z.lazy(() => ResourceUncheckedCreateWithoutCommentsInputSchema) ]),
}).strict();

export const ResourceUpsertWithoutCommentsInputSchema: z.ZodType<Prisma.ResourceUpsertWithoutCommentsInput> = z.object({
  update: z.union([ z.lazy(() => ResourceUpdateWithoutCommentsInputSchema),z.lazy(() => ResourceUncheckedUpdateWithoutCommentsInputSchema) ]),
  create: z.union([ z.lazy(() => ResourceCreateWithoutCommentsInputSchema),z.lazy(() => ResourceUncheckedCreateWithoutCommentsInputSchema) ]),
  where: z.lazy(() => ResourceWhereInputSchema).optional()
}).strict();

export const ResourceUpdateToOneWithWhereWithoutCommentsInputSchema: z.ZodType<Prisma.ResourceUpdateToOneWithWhereWithoutCommentsInput> = z.object({
  where: z.lazy(() => ResourceWhereInputSchema).optional(),
  data: z.union([ z.lazy(() => ResourceUpdateWithoutCommentsInputSchema),z.lazy(() => ResourceUncheckedUpdateWithoutCommentsInputSchema) ]),
}).strict();

export const ResourceUpdateWithoutCommentsInputSchema: z.ZodType<Prisma.ResourceUpdateWithoutCommentsInput> = z.object({
  id: z.union([ z.string().cuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  category: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  address: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  latitude: z.union([ z.number(),z.lazy(() => FloatFieldUpdateOperationsInputSchema) ]).optional(),
  longitude: z.union([ z.number(),z.lazy(() => FloatFieldUpdateOperationsInputSchema) ]).optional(),
  postalCode: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  email: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  contactNumber: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  website: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  inactive: z.union([ z.boolean(),z.lazy(() => NullableBoolFieldUpdateOperationsInputSchema) ]).optional().nullable(),
}).strict();

export const ResourceUncheckedUpdateWithoutCommentsInputSchema: z.ZodType<Prisma.ResourceUncheckedUpdateWithoutCommentsInput> = z.object({
  id: z.union([ z.string().cuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  category: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  address: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  latitude: z.union([ z.number(),z.lazy(() => FloatFieldUpdateOperationsInputSchema) ]).optional(),
  longitude: z.union([ z.number(),z.lazy(() => FloatFieldUpdateOperationsInputSchema) ]).optional(),
  postalCode: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  email: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  contactNumber: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  website: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  inactive: z.union([ z.boolean(),z.lazy(() => NullableBoolFieldUpdateOperationsInputSchema) ]).optional().nullable(),
}).strict();

export const CommentCreateManyResourceInputSchema: z.ZodType<Prisma.CommentCreateManyResourceInput> = z.object({
  id: z.string().cuid().optional(),
  content: z.string(),
  contentHtml: z.string(),
  author: z.string(),
  createdAt: z.coerce.date().optional()
}).strict();

export const CommentUpdateWithoutResourceInputSchema: z.ZodType<Prisma.CommentUpdateWithoutResourceInput> = z.object({
  id: z.union([ z.string().cuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  content: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  contentHtml: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  author: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const CommentUncheckedUpdateWithoutResourceInputSchema: z.ZodType<Prisma.CommentUncheckedUpdateWithoutResourceInput> = z.object({
  id: z.union([ z.string().cuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  content: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  contentHtml: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  author: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const CommentUncheckedUpdateManyWithoutResourceInputSchema: z.ZodType<Prisma.CommentUncheckedUpdateManyWithoutResourceInput> = z.object({
  id: z.union([ z.string().cuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  content: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  contentHtml: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  author: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

/////////////////////////////////////////
// ARGS
/////////////////////////////////////////

export const ResourceFindFirstArgsSchema: z.ZodType<Prisma.ResourceFindFirstArgs> = z.object({
  select: ResourceSelectSchema.optional(),
  include: ResourceIncludeSchema.optional(),
  where: ResourceWhereInputSchema.optional(),
  orderBy: z.union([ ResourceOrderByWithRelationInputSchema.array(),ResourceOrderByWithRelationInputSchema ]).optional(),
  cursor: ResourceWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ ResourceScalarFieldEnumSchema,ResourceScalarFieldEnumSchema.array() ]).optional(),
}).strict() ;

export const ResourceFindFirstOrThrowArgsSchema: z.ZodType<Prisma.ResourceFindFirstOrThrowArgs> = z.object({
  select: ResourceSelectSchema.optional(),
  include: ResourceIncludeSchema.optional(),
  where: ResourceWhereInputSchema.optional(),
  orderBy: z.union([ ResourceOrderByWithRelationInputSchema.array(),ResourceOrderByWithRelationInputSchema ]).optional(),
  cursor: ResourceWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ ResourceScalarFieldEnumSchema,ResourceScalarFieldEnumSchema.array() ]).optional(),
}).strict() ;

export const ResourceFindManyArgsSchema: z.ZodType<Prisma.ResourceFindManyArgs> = z.object({
  select: ResourceSelectSchema.optional(),
  include: ResourceIncludeSchema.optional(),
  where: ResourceWhereInputSchema.optional(),
  orderBy: z.union([ ResourceOrderByWithRelationInputSchema.array(),ResourceOrderByWithRelationInputSchema ]).optional(),
  cursor: ResourceWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ ResourceScalarFieldEnumSchema,ResourceScalarFieldEnumSchema.array() ]).optional(),
}).strict() ;

export const ResourceAggregateArgsSchema: z.ZodType<Prisma.ResourceAggregateArgs> = z.object({
  where: ResourceWhereInputSchema.optional(),
  orderBy: z.union([ ResourceOrderByWithRelationInputSchema.array(),ResourceOrderByWithRelationInputSchema ]).optional(),
  cursor: ResourceWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
}).strict() ;

export const ResourceGroupByArgsSchema: z.ZodType<Prisma.ResourceGroupByArgs> = z.object({
  where: ResourceWhereInputSchema.optional(),
  orderBy: z.union([ ResourceOrderByWithAggregationInputSchema.array(),ResourceOrderByWithAggregationInputSchema ]).optional(),
  by: ResourceScalarFieldEnumSchema.array(),
  having: ResourceScalarWhereWithAggregatesInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
}).strict() ;

export const ResourceFindUniqueArgsSchema: z.ZodType<Prisma.ResourceFindUniqueArgs> = z.object({
  select: ResourceSelectSchema.optional(),
  include: ResourceIncludeSchema.optional(),
  where: ResourceWhereUniqueInputSchema,
}).strict() ;

export const ResourceFindUniqueOrThrowArgsSchema: z.ZodType<Prisma.ResourceFindUniqueOrThrowArgs> = z.object({
  select: ResourceSelectSchema.optional(),
  include: ResourceIncludeSchema.optional(),
  where: ResourceWhereUniqueInputSchema,
}).strict() ;

export const VerificationTokenFindFirstArgsSchema: z.ZodType<Prisma.VerificationTokenFindFirstArgs> = z.object({
  select: VerificationTokenSelectSchema.optional(),
  where: VerificationTokenWhereInputSchema.optional(),
  orderBy: z.union([ VerificationTokenOrderByWithRelationInputSchema.array(),VerificationTokenOrderByWithRelationInputSchema ]).optional(),
  cursor: VerificationTokenWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ VerificationTokenScalarFieldEnumSchema,VerificationTokenScalarFieldEnumSchema.array() ]).optional(),
}).strict() ;

export const VerificationTokenFindFirstOrThrowArgsSchema: z.ZodType<Prisma.VerificationTokenFindFirstOrThrowArgs> = z.object({
  select: VerificationTokenSelectSchema.optional(),
  where: VerificationTokenWhereInputSchema.optional(),
  orderBy: z.union([ VerificationTokenOrderByWithRelationInputSchema.array(),VerificationTokenOrderByWithRelationInputSchema ]).optional(),
  cursor: VerificationTokenWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ VerificationTokenScalarFieldEnumSchema,VerificationTokenScalarFieldEnumSchema.array() ]).optional(),
}).strict() ;

export const VerificationTokenFindManyArgsSchema: z.ZodType<Prisma.VerificationTokenFindManyArgs> = z.object({
  select: VerificationTokenSelectSchema.optional(),
  where: VerificationTokenWhereInputSchema.optional(),
  orderBy: z.union([ VerificationTokenOrderByWithRelationInputSchema.array(),VerificationTokenOrderByWithRelationInputSchema ]).optional(),
  cursor: VerificationTokenWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ VerificationTokenScalarFieldEnumSchema,VerificationTokenScalarFieldEnumSchema.array() ]).optional(),
}).strict() ;

export const VerificationTokenAggregateArgsSchema: z.ZodType<Prisma.VerificationTokenAggregateArgs> = z.object({
  where: VerificationTokenWhereInputSchema.optional(),
  orderBy: z.union([ VerificationTokenOrderByWithRelationInputSchema.array(),VerificationTokenOrderByWithRelationInputSchema ]).optional(),
  cursor: VerificationTokenWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
}).strict() ;

export const VerificationTokenGroupByArgsSchema: z.ZodType<Prisma.VerificationTokenGroupByArgs> = z.object({
  where: VerificationTokenWhereInputSchema.optional(),
  orderBy: z.union([ VerificationTokenOrderByWithAggregationInputSchema.array(),VerificationTokenOrderByWithAggregationInputSchema ]).optional(),
  by: VerificationTokenScalarFieldEnumSchema.array(),
  having: VerificationTokenScalarWhereWithAggregatesInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
}).strict() ;

export const VerificationTokenFindUniqueArgsSchema: z.ZodType<Prisma.VerificationTokenFindUniqueArgs> = z.object({
  select: VerificationTokenSelectSchema.optional(),
  where: VerificationTokenWhereUniqueInputSchema,
}).strict() ;

export const VerificationTokenFindUniqueOrThrowArgsSchema: z.ZodType<Prisma.VerificationTokenFindUniqueOrThrowArgs> = z.object({
  select: VerificationTokenSelectSchema.optional(),
  where: VerificationTokenWhereUniqueInputSchema,
}).strict() ;

export const CommentFindFirstArgsSchema: z.ZodType<Prisma.CommentFindFirstArgs> = z.object({
  select: CommentSelectSchema.optional(),
  include: CommentIncludeSchema.optional(),
  where: CommentWhereInputSchema.optional(),
  orderBy: z.union([ CommentOrderByWithRelationInputSchema.array(),CommentOrderByWithRelationInputSchema ]).optional(),
  cursor: CommentWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ CommentScalarFieldEnumSchema,CommentScalarFieldEnumSchema.array() ]).optional(),
}).strict() ;

export const CommentFindFirstOrThrowArgsSchema: z.ZodType<Prisma.CommentFindFirstOrThrowArgs> = z.object({
  select: CommentSelectSchema.optional(),
  include: CommentIncludeSchema.optional(),
  where: CommentWhereInputSchema.optional(),
  orderBy: z.union([ CommentOrderByWithRelationInputSchema.array(),CommentOrderByWithRelationInputSchema ]).optional(),
  cursor: CommentWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ CommentScalarFieldEnumSchema,CommentScalarFieldEnumSchema.array() ]).optional(),
}).strict() ;

export const CommentFindManyArgsSchema: z.ZodType<Prisma.CommentFindManyArgs> = z.object({
  select: CommentSelectSchema.optional(),
  include: CommentIncludeSchema.optional(),
  where: CommentWhereInputSchema.optional(),
  orderBy: z.union([ CommentOrderByWithRelationInputSchema.array(),CommentOrderByWithRelationInputSchema ]).optional(),
  cursor: CommentWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ CommentScalarFieldEnumSchema,CommentScalarFieldEnumSchema.array() ]).optional(),
}).strict() ;

export const CommentAggregateArgsSchema: z.ZodType<Prisma.CommentAggregateArgs> = z.object({
  where: CommentWhereInputSchema.optional(),
  orderBy: z.union([ CommentOrderByWithRelationInputSchema.array(),CommentOrderByWithRelationInputSchema ]).optional(),
  cursor: CommentWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
}).strict() ;

export const CommentGroupByArgsSchema: z.ZodType<Prisma.CommentGroupByArgs> = z.object({
  where: CommentWhereInputSchema.optional(),
  orderBy: z.union([ CommentOrderByWithAggregationInputSchema.array(),CommentOrderByWithAggregationInputSchema ]).optional(),
  by: CommentScalarFieldEnumSchema.array(),
  having: CommentScalarWhereWithAggregatesInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
}).strict() ;

export const CommentFindUniqueArgsSchema: z.ZodType<Prisma.CommentFindUniqueArgs> = z.object({
  select: CommentSelectSchema.optional(),
  include: CommentIncludeSchema.optional(),
  where: CommentWhereUniqueInputSchema,
}).strict() ;

export const CommentFindUniqueOrThrowArgsSchema: z.ZodType<Prisma.CommentFindUniqueOrThrowArgs> = z.object({
  select: CommentSelectSchema.optional(),
  include: CommentIncludeSchema.optional(),
  where: CommentWhereUniqueInputSchema,
}).strict() ;

export const ResourceCreateArgsSchema: z.ZodType<Prisma.ResourceCreateArgs> = z.object({
  select: ResourceSelectSchema.optional(),
  include: ResourceIncludeSchema.optional(),
  data: z.union([ ResourceCreateInputSchema,ResourceUncheckedCreateInputSchema ]),
}).strict() ;

export const ResourceUpsertArgsSchema: z.ZodType<Prisma.ResourceUpsertArgs> = z.object({
  select: ResourceSelectSchema.optional(),
  include: ResourceIncludeSchema.optional(),
  where: ResourceWhereUniqueInputSchema,
  create: z.union([ ResourceCreateInputSchema,ResourceUncheckedCreateInputSchema ]),
  update: z.union([ ResourceUpdateInputSchema,ResourceUncheckedUpdateInputSchema ]),
}).strict() ;

export const ResourceCreateManyArgsSchema: z.ZodType<Prisma.ResourceCreateManyArgs> = z.object({
  data: z.union([ ResourceCreateManyInputSchema,ResourceCreateManyInputSchema.array() ]),
  skipDuplicates: z.boolean().optional(),
}).strict() ;

export const ResourceDeleteArgsSchema: z.ZodType<Prisma.ResourceDeleteArgs> = z.object({
  select: ResourceSelectSchema.optional(),
  include: ResourceIncludeSchema.optional(),
  where: ResourceWhereUniqueInputSchema,
}).strict() ;

export const ResourceUpdateArgsSchema: z.ZodType<Prisma.ResourceUpdateArgs> = z.object({
  select: ResourceSelectSchema.optional(),
  include: ResourceIncludeSchema.optional(),
  data: z.union([ ResourceUpdateInputSchema,ResourceUncheckedUpdateInputSchema ]),
  where: ResourceWhereUniqueInputSchema,
}).strict() ;

export const ResourceUpdateManyArgsSchema: z.ZodType<Prisma.ResourceUpdateManyArgs> = z.object({
  data: z.union([ ResourceUpdateManyMutationInputSchema,ResourceUncheckedUpdateManyInputSchema ]),
  where: ResourceWhereInputSchema.optional(),
}).strict() ;

export const ResourceDeleteManyArgsSchema: z.ZodType<Prisma.ResourceDeleteManyArgs> = z.object({
  where: ResourceWhereInputSchema.optional(),
}).strict() ;

export const VerificationTokenCreateArgsSchema: z.ZodType<Prisma.VerificationTokenCreateArgs> = z.object({
  select: VerificationTokenSelectSchema.optional(),
  data: z.union([ VerificationTokenCreateInputSchema,VerificationTokenUncheckedCreateInputSchema ]),
}).strict() ;

export const VerificationTokenUpsertArgsSchema: z.ZodType<Prisma.VerificationTokenUpsertArgs> = z.object({
  select: VerificationTokenSelectSchema.optional(),
  where: VerificationTokenWhereUniqueInputSchema,
  create: z.union([ VerificationTokenCreateInputSchema,VerificationTokenUncheckedCreateInputSchema ]),
  update: z.union([ VerificationTokenUpdateInputSchema,VerificationTokenUncheckedUpdateInputSchema ]),
}).strict() ;

export const VerificationTokenCreateManyArgsSchema: z.ZodType<Prisma.VerificationTokenCreateManyArgs> = z.object({
  data: z.union([ VerificationTokenCreateManyInputSchema,VerificationTokenCreateManyInputSchema.array() ]),
  skipDuplicates: z.boolean().optional(),
}).strict() ;

export const VerificationTokenDeleteArgsSchema: z.ZodType<Prisma.VerificationTokenDeleteArgs> = z.object({
  select: VerificationTokenSelectSchema.optional(),
  where: VerificationTokenWhereUniqueInputSchema,
}).strict() ;

export const VerificationTokenUpdateArgsSchema: z.ZodType<Prisma.VerificationTokenUpdateArgs> = z.object({
  select: VerificationTokenSelectSchema.optional(),
  data: z.union([ VerificationTokenUpdateInputSchema,VerificationTokenUncheckedUpdateInputSchema ]),
  where: VerificationTokenWhereUniqueInputSchema,
}).strict() ;

export const VerificationTokenUpdateManyArgsSchema: z.ZodType<Prisma.VerificationTokenUpdateManyArgs> = z.object({
  data: z.union([ VerificationTokenUpdateManyMutationInputSchema,VerificationTokenUncheckedUpdateManyInputSchema ]),
  where: VerificationTokenWhereInputSchema.optional(),
}).strict() ;

export const VerificationTokenDeleteManyArgsSchema: z.ZodType<Prisma.VerificationTokenDeleteManyArgs> = z.object({
  where: VerificationTokenWhereInputSchema.optional(),
}).strict() ;

export const CommentCreateArgsSchema: z.ZodType<Prisma.CommentCreateArgs> = z.object({
  select: CommentSelectSchema.optional(),
  include: CommentIncludeSchema.optional(),
  data: z.union([ CommentCreateInputSchema,CommentUncheckedCreateInputSchema ]),
}).strict() ;

export const CommentUpsertArgsSchema: z.ZodType<Prisma.CommentUpsertArgs> = z.object({
  select: CommentSelectSchema.optional(),
  include: CommentIncludeSchema.optional(),
  where: CommentWhereUniqueInputSchema,
  create: z.union([ CommentCreateInputSchema,CommentUncheckedCreateInputSchema ]),
  update: z.union([ CommentUpdateInputSchema,CommentUncheckedUpdateInputSchema ]),
}).strict() ;

export const CommentCreateManyArgsSchema: z.ZodType<Prisma.CommentCreateManyArgs> = z.object({
  data: z.union([ CommentCreateManyInputSchema,CommentCreateManyInputSchema.array() ]),
  skipDuplicates: z.boolean().optional(),
}).strict() ;

export const CommentDeleteArgsSchema: z.ZodType<Prisma.CommentDeleteArgs> = z.object({
  select: CommentSelectSchema.optional(),
  include: CommentIncludeSchema.optional(),
  where: CommentWhereUniqueInputSchema,
}).strict() ;

export const CommentUpdateArgsSchema: z.ZodType<Prisma.CommentUpdateArgs> = z.object({
  select: CommentSelectSchema.optional(),
  include: CommentIncludeSchema.optional(),
  data: z.union([ CommentUpdateInputSchema,CommentUncheckedUpdateInputSchema ]),
  where: CommentWhereUniqueInputSchema,
}).strict() ;

export const CommentUpdateManyArgsSchema: z.ZodType<Prisma.CommentUpdateManyArgs> = z.object({
  data: z.union([ CommentUpdateManyMutationInputSchema,CommentUncheckedUpdateManyInputSchema ]),
  where: CommentWhereInputSchema.optional(),
}).strict() ;

export const CommentDeleteManyArgsSchema: z.ZodType<Prisma.CommentDeleteManyArgs> = z.object({
  where: CommentWhereInputSchema.optional(),
}).strict() ;