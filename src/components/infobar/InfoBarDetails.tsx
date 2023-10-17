import { Grid, GridItem, Text } from "@chakra-ui/react";
import { Resource } from "@prisma/client";
import { BiGlobe, BiPhone, BiMailSend, BiMapPin } from "react-icons/bi";

export const InfoBarDetails = ({
  address,
  postalCode,
  website,
  contactNumber,
  email,
}: Partial<Resource>) => {
  return (
    <>
      <Grid templateColumns="repeat(100, 1fr)" marginTop="3">
        <GridItem colSpan={1} marginRight="3">
          <BiMapPin />
        </GridItem>
        <GridItem colSpan={99}>
          <Text textStyle="body-2">
            {address} S({postalCode})
          </Text>
        </GridItem>
      </Grid>

      {email && (
        <Grid templateColumns="repeat(100, 1fr)" marginTop="3">
          <GridItem colSpan={1} marginRight="3">
            <BiMailSend />
          </GridItem>
          <GridItem colSpan={99}>
            <Text textStyle="body-2">{email}</Text>
          </GridItem>
        </Grid>
      )}

      {contactNumber && (
        <Grid templateColumns="repeat(100, 1fr)" marginTop="3">
          <GridItem colSpan={1} marginRight="3">
            <BiPhone />
          </GridItem>
          <GridItem colSpan={99}>
            <Text textStyle="body-2">{contactNumber}</Text>
          </GridItem>
        </Grid>
      )}

      {website && (
        <Grid templateColumns="repeat(100, 1fr)" marginTop="3">
          <GridItem colSpan={1} marginRight="3">
            <BiGlobe />
          </GridItem>
          <GridItem colSpan={99}>
            <Text textStyle="body-2">{website}</Text>
          </GridItem>
        </Grid>
      )}
    </>
  );
};
