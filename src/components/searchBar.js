import styled from "styled-components"

export function SearchBar ({search, onChange}) {
    return (
      <div>
        <SearchBox className="input" type="text" placeholder=" type을 입력해주세요" value={search} onChange={onChange}/>
      </div>)
}

export const SearchBox = styled.input`
  height: 23px;
  width: 15vw;
  background: transparent;
  outline: none;
  border-width: 0px 0px 2px;
  border-color: ${({theme}) => theme.colors.colorNavigationBorder};
  font-size: 15px;
  color: ${({theme}) => theme.colors.colorMainFont};
`;
