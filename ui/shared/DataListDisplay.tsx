import { Box, Text, chakra } from '@chakra-ui/react';
import React from 'react';

import EmptySearchResult from 'ui/shared/EmptySearchResult';

import DataFetchAlert from './DataFetchAlert';
import SkeletonList from './skeletons/SkeletonList';
import SkeletonTable from './skeletons/SkeletonTable';

type SkeletonProps =
  { customSkeleton: React.ReactNode } |
  {
    skeletonDesktopColumns: Array<string>;
    isLongSkeleton?: boolean;
    skeletonDesktopMinW?: string;
  }

type FilterProps = {
  hasActiveFilters: boolean;
  emptyFilteredText: string;
};

type Props = {
  isError: boolean;
  isLoading: boolean;
  items?: Array<unknown>;
  emptyText: string;
  actionBar?: React.ReactNode;
  content: React.ReactNode;
  className?: string;
  skeletonProps: SkeletonProps;
  filterProps?: FilterProps;
}

const DataListDisplay = (props: Props) => {
  if (props.isError) {
    return <DataFetchAlert className={ props.className }/>;
  }

  if (props.isLoading) {

    return (
      <Box className={ props.className }>
        { props.actionBar }
        { 'customSkeleton' in props.skeletonProps && props.skeletonProps.customSkeleton }
        { 'skeletonDesktopColumns' in props.skeletonProps && (
          <>
            <SkeletonList display={{ base: 'block', lg: 'none' }}/>
            <SkeletonTable
              display={{ base: 'none', lg: 'block' }}
              columns={ props.skeletonProps.skeletonDesktopColumns || [] }
              isLong={ props.skeletonProps.isLongSkeleton }
              minW={ props.skeletonProps.skeletonDesktopMinW }
            />
          </>
        ) }
      </Box>
    );
  }

  if (props.filterProps?.hasActiveFilters && !props.items?.length) {
    return (
      <Box className={ props.className }>
        { props.actionBar }
        <EmptySearchResult text={ props.filterProps.emptyFilteredText }/>
      </Box>
    );
  }

  if (!props.items?.length) {
    return props.emptyText ? <Text className={ props.className }>{ props.emptyText }</Text> : null;
  }

  return (
    <Box className={ props.className }>
      { props.actionBar }
      { props.content }
    </Box>
  );
};

export default chakra(DataListDisplay);
