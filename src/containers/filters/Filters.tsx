/**
 * Importing npm packages.
 */
import React from 'react';
import { useHistory } from 'react-router-dom';

/**
 * Importing npm design components.
 */
import { Select, Row, Col, Typography } from 'antd';

/**
 * Importing user defined components.
 */

/**
 *  Importing user defined modules.
 */
import { Genres, NovelStatus } from '../../typescript/api';
import { capitalizeWord, convertGenre } from '../../utils/lib';

/**
 * Importing styled components.
 */
import { Container, SelectFilter } from './styles';

/**
 * Importing types.
 */
type TFilters = 'genre' | 'status' | 'sortField' | 'sortOrder';

/**
 * Constants.
 */
const genres = [{ name: 'All', value: '' }, ...Object.keys(Genres).map((genre) => ({ name: convertGenre(genre), value: genre }))];
const novelStatus = [{ name: 'All', value: '' }, ...Object.keys(NovelStatus).map((status) => ({ name: capitalizeWord(status), value: status }))];
const genreList = genres.map((genre) => <Select.Option value={genre.value}>{genre.name}</Select.Option>);
const statuslist = novelStatus.map((status) => <Select.Option value={status.value}>{status.name}</Select.Option>);

function Filters() {
  const history = useHistory();
  const query = new URLSearchParams(history.location.search);

  const currentGenre = query.get('genre') || '';
  const currentNovelStatus = query.get('status') || '';
  const currentSortBy = query.get('sortField') || 'title';
  const currentSortOder = query.get('sortOrder') || 'asc';

  function handleChange(filterField: TFilters) {
    return function (value: any) {
      if (value) query.set(filterField, value);
      else query.delete(filterField);
      history.push(`/novel?${query.toString()}`);
    };
  }

  return (
    <Container className='mb-4'>
      <Row align='middle'>
        <Col span={6} className='d-flex justify-content-center'>
          <Typography.Title level={4} className='mr-3'>
            Genre:
          </Typography.Title>
          <SelectFilter placeholder='Filter by Genre' value={currentGenre} onChange={handleChange('genre')}>
            {genreList}
          </SelectFilter>
        </Col>
        <Col span={6} className='d-flex justify-content-center'>
          <Typography.Title level={4} className='mr-3'>
            Novel Status:
          </Typography.Title>
          <SelectFilter placeholder='Filter by Novel Status' value={currentNovelStatus} onChange={handleChange('status')}>
            {statuslist}
          </SelectFilter>
        </Col>
        <Col span={6} className='d-flex justify-content-center'>
          <Typography.Title level={4} className='mr-3'>
            Sort By:
          </Typography.Title>
          <SelectFilter placeholder='Sort By' value={currentSortBy} onChange={handleChange('sortField')}>
            <Select.Option value='title'>Title</Select.Option>
            <Select.Option value='views'>Views</Select.Option>
            <Select.Option value='chapterCount'>Chapter Count</Select.Option>
            <Select.Option value='createdAt'>Time Created</Select.Option>
          </SelectFilter>
        </Col>
        <Col span={6} className='d-flex justify-content-center'>
          <Typography.Title level={4} className='mr-3'>
            Sort Order:
          </Typography.Title>
          <SelectFilter placeholder='Sort By' value={currentSortOder} onChange={handleChange('sortOrder')}>
            <Select.Option value='asc'>Ascending</Select.Option>
            <Select.Option value='desc'>Descending</Select.Option>
          </SelectFilter>
        </Col>
      </Row>
    </Container>
  );
}

export default Filters;

{
  /* <Container>
<div className='py-4 px-5 d-flex flex-column'>
  <Space size='large' className='mb-3'>
    <Typography.Title level={5} className='mb-0'>
      Genre:
    </Typography.Title>
    {genreList}
  </Space>
</div>
</Container> */
}
