import { makeObservable, observable, action } from 'mobx';
import * as viewType from '../../../constant/viewType'
import MapView from '../../map/MapView';
import { MapVM } from '../../map/MapVM';
import SliderView from '../../slider/SliderView';
import { SliderVM } from '../../slider/SliderVM';
import * as postUtil from '../../../util/hb_PostUtil'
import { Button } from 'antd';
import FloatItemView from '../../float/FloatItemView';
import * as floatItemVMUtil from '../../float/FloatItemVMUtil'

export class CompVM1 {
  constructor() {
    makeObservable(this, {
      currentViewType: observable,
    })
  }

  currentViewType = viewType.MAPVIEW

  mapVM
  getMapVM = () => {
    if (!this.mapVM) {
      var obj = this.mapVM = new MapVM();
      obj.onRequest = (data) => {
        var { group } = data;

        var handle = (data) => {
          var contents = data.map(x => { return x.content });
          this.getSliderVM().setHtmlContents(contents);
          this.toggleView();
        }

        postUtil.get(group, handle);
      }
    }
    return this.mapVM;
  }

  sliderVM
  getSliderVM = () => {
    if (!this.sliderVM) {
      this.sliderVM = new SliderVM();
    }
    return this.sliderVM;
  }

  toggleView = () => {
    if (this.currentViewType === viewType.MAPVIEW) {
      this.currentViewType = viewType.SLIDERVIEW;
    } else {
      this.currentViewType = viewType.MAPVIEW;
    }
  }

  getItemView = () => {
    switch (this.currentViewType) {
      case viewType.MAPVIEW:
        return <MapView store={this.getMapVM()} />
      case viewType.SLIDERVIEW:
        return <div style={{position:'absolute', top:50, left:35, width:800}}>
          <SliderView store={this.getSliderVM()} />
        </div>
    }
  }

  getWrapper = () => {
    if (this.currentViewType === viewType.MAPVIEW) return '';

    var floatItemStore = floatItemVMUtil.get('top left');
    floatItemStore.wrapper = <Button onClick={this.toggleView}>Back</Button>

    return <FloatItemView store={floatItemStore} />
  }
}