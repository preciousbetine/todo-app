import classnames from 'classnames';
import { usePagination, DOTS } from '../hooks/usePagination';
import '../styles/Pagination.scss';

const Pagination = ({
  onPageChange,
  totalCount,
  siblingCount = 1,
  currentPage,
  pageSize,
  className,
}: {
  onPageChange: (page: number|string) => void,
  totalCount: number,
  siblingCount?: number,
  currentPage: number,
  pageSize: number,
  className: string
}) => {

  const paginationRange = usePagination({
    currentPage,
    totalCount,
    siblingCount,
    pageSize
  });

  if (currentPage === 0 || paginationRange.length < 2) {
    return null;
  }

  const onNext = () => {
    onPageChange(currentPage + 1);
  };

  const onPrevious = () => {
    onPageChange(currentPage - 1);
  };

  const lastPage = paginationRange[paginationRange.length - 1];
  return (
    <ul
      className={classnames('pagination-container', { [className]: className })}
    >
      <li
        className={classnames('pagination-item pagination-control', {
          disabled: currentPage === 1,
        })}
        onClick={onPrevious}
      >
        <img src="arrow-left.svg" alt="" />
        <span>Previous</span>
      </li>
      <ul className={classnames('pagination-numbers')} key="page-numbers">
        {paginationRange.map((pageNumber, index) => {
          if (pageNumber === DOTS) {
            return <li className="pagination-item dots">&#8230;</li>;
          }

          return (
            <li
              key={`${pageNumber} ${index}`}
              className={classnames('pagination-item', {
                selected: pageNumber === currentPage
              })}
              onClick={() => onPageChange(pageNumber)}
            >
              {pageNumber}
            </li>
          );
        })}
      </ul>
      <li
        className={classnames('pagination-item pagination-control', {
          disabled: currentPage === lastPage
        })}
        onClick={onNext}
      >
        <span>Next</span>
        <img src="arrow-right.svg" alt="" />
      </li>
    </ul>
  );
};

export default Pagination;
